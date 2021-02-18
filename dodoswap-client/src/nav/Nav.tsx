import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Decoded } from '../App'
import { Dropdown, Menu, Message } from 'semantic-ui-react'
import Login from '../content/pages/Login'

//props
interface NavProps {
  user: Decoded | null,
  updateToken: (newToken: string | null) => void
}

const Nav: React.FC<NavProps> = props => {
  const handleLogout = (e: FormEvent) => {
    e.preventDefault()
    // Remove the token from local storage (or cookies)
    props.updateToken('')
    localStorage.removeItem('boilerToken')

  }

  var links = (
    <Menu pointing secondary className="top-nav">
      <Menu.Item
        name='Home'
        as={Link} to="/"
      />
      {/* <Message color='red'>Sorry for the inconvenience. The site is currently down for maintenance.</Message> */}
      <Login user={props.user} updateToken={props.updateToken} />
    </Menu>
  )

  // If the user is logged in, show profile page and logout links
  if (props.user) {
    links = (
      <Menu pointing secondary className="top-nav">
        <Menu.Item
          name='Home'
          href="/"
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='Profile'
            as={Link} to="/user"
          />
          <Menu.Item
            name='Catalogue'
            as={Link} to="/catalogue"
          />
          <Dropdown pointing text="Events" id="event" className="top-nav">
            <Dropdown.Menu >
              <Dropdown.Item as={Link} to="/event">All Events</Dropdown.Item>
              <Dropdown.Item as={Link} to="/event/new">Add Event</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item
            name='Logout'
            as={Link} to="/"
            onClick={handleLogout}
          />
        </Menu.Menu>
      </Menu>
    )
  }

  return (
    <div>
      {links}
    </div>

  )
}

export default Nav
