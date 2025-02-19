import { createContext, useReducer, useContext } from 'react'

const booksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      state = action.payload
      return state
    default:
      return state
  }
}

const BooksContext = createContext()

export const useBooksValue = () => {
  const booksAndDispatch = useContext(BooksContext)
  return booksAndDispatch[0]
}

export const useBooksDispatch = () => {
  const booksAndDispatch = useContext(BooksContext)
  return booksAndDispatch[1]
}

export const BooksContextProvider = props => {
  const [books, booksDispatch] = useReducer(booksReducer, null)
  return (
    <BooksContext.Provider value={[books, booksDispatch]}>
      {props.children}
    </BooksContext.Provider>
  )
}

export default BooksContext
