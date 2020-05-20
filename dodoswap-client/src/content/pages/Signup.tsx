// Packages
import React, { FormEvent, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import App,{ Decoded } from '../../App'

interface SignupProps {
  user: Decoded | null,
  updateToken: (newToken: string | null) => void
}

const Signup: React.FC<SignupProps> = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [firstname, setFirstname] = useState('')
  let [lastname, setLastname] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    //Send the user sign up data to the server
    console.log('submit', email, password)
    // Fetch call to POST data
    fetch(process.env.REACT_APP_SERVER_URL + 'auth/signup', {
      method: 'POST', 
      body: JSON.stringify({
        email, 
        password, 
        firstname,
        lastname,
      }), 
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('RESPONSE', response)
      //Handle non-200 responses
      if (!response.ok) {
        setMessage(`${response.status}: ${response.statusText}`)
        return 
      }
      //we got a good (200) response, we get the token
      response.json()
      .then(result => {
        console.log("RESULT", result)
        //Giving the token back up to 
        props.updateToken(result.token)
      })
    })
    .catch(err => {
      console.log('ERROR SUBMITTING: ', err)
    })
  }

  //Check if there is a user and redirect them to their profile
  if (props.user) {
    return <Redirect to="/profile" />
  }

  return (
    <div>
      <h2>Signup</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input name="firstname" placeholder="Your first name" onChange={e => setFirstname(e.target.value)} />
        </div>
        <div>
          <label>Last Name:</label>
          <input name="lastname" placeholder="Your last name" onChange={e => setLastname(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <Button basic color='purple' type="submit">Sign Me Up!</Button>
      </form>
    </div>
  )
}

export default Signup
