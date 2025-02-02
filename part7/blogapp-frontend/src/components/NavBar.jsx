import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../reducers/UserContext'
import { AppBar, Toolbar, Button, Typography } from '@mui/material'
import Notification from './Notification'

const NavBar = () => {
  const padding = {
    paddingRight: 5,
  }

  const [user, dispatch] = useContext(UserContext)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
          <b>| logged in as {user.username}</b>
        </Typography>
        <Notification />
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
