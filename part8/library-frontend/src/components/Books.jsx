import { useState } from 'react'
import { ALL_BOOKS } from '../graphql/queries'
import { useLazyQuery } from '@apollo/client'

const Books = ({ books, setBooks }) => {
  const [genres, setGenres] = useState([])
  const { loading, error, data } = useLazyQuery(ALL_BOOKS, {
    variables: {
      // genre: thisGenre,
    },
  })
  // let thisGenre = ''

  const filterBooks = genre => {
    thisGenre = genre
    // setBooks(books.filter(book => book.genres.includes(genre)))
    // filter({ variables: { genre } })
    // console.log(filter)
  }

  if (books) {
    books.map(book => {
      book.genres.map(genre => {
        if (!genres.includes(genre)) {
          setGenres(genres.concat(genre))
        }
      })
    })
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books &&
            books.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {genres.map(genre => (
        <button key={genre} onClick={() => filterBooks(genre)}>
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books
