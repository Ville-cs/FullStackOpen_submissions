const backendUrl = "http://localhost:3001/anecdotes"

export const getAllAnecdotes = async () => {
  const response = await fetch(backendUrl)
  if (!response.ok) throw new Error("Failed to fetch anecdotes")
  return await response.json()
}

export const addAnecdote = async (anecdote) => {
  const response = await fetch(backendUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: anecdote, votes: 0 }),
  })
  if (!response.ok) throw new Error("Failed to create anecdotes")
  return await response.json()
}

export const upvoteAnecdote = async (id, anecdote) => {
  const response = await fetch(`${backendUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  })
  if (!response.ok) throw new Error("Failed to update anecdote")
  return await response.json()
}

export const deleteAnecdote = async (id) => {
  const response = await fetch(`${backendUrl}/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) throw new Error("Failed to delete anecdote")
  return await response.json()
}
