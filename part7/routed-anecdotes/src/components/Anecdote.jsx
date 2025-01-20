const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>By {anecdote.author}</div>
      <a href={anecdote.info}>{anecdote.info}</a>
    </div>
  )
}

export default Anecdote
