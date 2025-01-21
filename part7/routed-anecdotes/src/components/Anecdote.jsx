const Anecdote = ({ anecdote }) => {
  const style = {
    padding: 25,
  }

  return (
    <div style={style}>
      <h2>{anecdote.content}</h2>
      <div>By {anecdote.author}</div>
      <a href={anecdote.info}>{anecdote.info}</a>
    </div>
  )
}

export default Anecdote
