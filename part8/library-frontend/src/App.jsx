import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  useEffect(() => {
    const userToken = window.localStorage.getItem('library-user-token')
    if (userToken) {
      setToken(userToken)
    }
  }, [])

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
    navigate('/')
  }

  return (
    <div>
      <div>
        <Link to="/">
          <button>authors</button>
        </Link>
        <Link to="/books">
          <button>books</button>
        </Link>
        {!token ? (
          <Link to="/login">
            <button>login</button>
          </Link>
        ) : (
          <Link to="/newbook">
            <button>add book</button>
          </Link>
        )}
        {token ? <button onClick={handleLogout}>logout</button> : null}
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/newbook"
          element={!token ? <Login setToken={setToken} /> : <NewBook />}
        />
        <Route
          path="login"
          element={
            !token ? <Login setToken={setToken} /> : <Navigate replace to="/" />
          }
        />
      </Routes>
    </div>
  )
}

export default App
