import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getAnecdote = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const addNew = async content => {
  const object = { content: content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addLike = async id => {
  const oldObject = await getAnecdote(id)

  const object = { content: oldObject.content, votes: (oldObject.votes += 1) }
  const response = await axios.put(`${baseUrl}/${id}`, object)
  return response.data
}

export default { getAll, getAnecdote, addNew, addLike }
