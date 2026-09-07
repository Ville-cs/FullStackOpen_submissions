const baseUrl = "http://localhost:3001/anecdotes"

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes")
  }
  return await response.json()
}

export const postAnecdote = async (anecdote) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: anecdote, votes: 0 }),
  })
  if (!response.ok) {
    const error = await response.json()
    throw error
  }
  return await response.json()
}

export const upvoteAnecdote = async (anecdote) => {
  const response = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  })
  if (!response.ok) {
    const error = await response.json()
    throw error
  }
  return await response.json()
}
