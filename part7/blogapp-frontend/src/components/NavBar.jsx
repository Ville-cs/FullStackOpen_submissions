import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../reducers/UserContext'

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
    <div>
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      {`${user.username} logged in`}
      <button onClick={handleLogout} type="button">
        logout
      </button>
    </div>
  )
}

export default NavBar
