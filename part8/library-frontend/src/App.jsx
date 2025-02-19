import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import { ALL_BOOKS, ME } from './graphql/queries'
import { useQuery } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [books, setBooks] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()
  const { data: booksData } = useQuery(ALL_BOOKS)
  const { data: userData } = useQuery(ME)

  useEffect(() => {
    const userToken = window.localStorage.getItem('library-user-token')
    if (userToken) {
      setToken(userToken)
    }
  }, [])

  useEffect(() => {
    if (booksData) {
      setBooks(booksData.allBooks)
    }
    if (userData) {
      setUserDetails(userData.me)
    }
  }, [booksData, userData])

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
        <Link to="/recommended">
          <button>recommended</button>
        </Link>
        {token ? <button onClick={handleLogout}>logout</button> : null}
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route
          path="/books"
          element={<Books books={books} setBooks={setBooks} />}
        />
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
        <Route
          path="/recommended"
          element={<Recommended books={books} userDetails={userDetails} />}
        />
      </Routes>
    </div>
  )
}

export default App
