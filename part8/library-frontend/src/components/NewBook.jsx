import { useState } from 'react'
import { ALL_AUTHORS, ALL_BOOKS } from '../graphql/queries'
import { CREATE_BOOK } from '../graphql/mutations'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publish, setPublish] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const navigate = useNavigate()

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: error => {
      console.log(error)
    },
  })

  const published = Number(publish)

  const submit = async event => {
    event.preventDefault()
    createBook({ variables: { title, author, published, genres } })

    setTitle('')
    setPublish('')
    setAuthor('')
    setGenres([])
    setGenre('')

    navigate('/books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={publish}
            onChange={({ target }) => setPublish(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
