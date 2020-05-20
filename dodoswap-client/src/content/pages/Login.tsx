// Packages
import React, { FormEvent,useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Decoded } from '../../App'

interface LoginProps {
  user: Decoded | null,
  updateToken: (newToken: string | null) => void
}

const Login:React.FC<LoginProps> = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')

  useEffect(() => {
    setMessage('')
  }, [email, password])


  // Event handlers
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    //Send the user sign up data to the server
    console.log('submit', email, password)

    // Fetch call to POST data
    fetch(process.env.REACT_APP_SERVER_URL + 'auth/login', {
      method: 'POST', 
      body: JSON.stringify({
        email, 
        password
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
    return <Redirect to="/user" />
  }

  return (
    <div>
      <h2>Login</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">Beam Me Up!</button>
        </form>
    </div>
  )
}

export default Login