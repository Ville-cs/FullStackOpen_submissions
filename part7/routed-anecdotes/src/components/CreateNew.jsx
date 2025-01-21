import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = props => {
  const { onReset: resetContent, ...content } = useField('text')
  const { onReset: resetAuthor, ...author } = useField('text')
  const { onReset: resetInfo, ...info } = useField('text')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate('/')
    props.setNotification(`A new anecdote ${content.value} created!`)
    setTimeout(() => {
      props.setNotification('')
    }, 5000)
  }

  const resetForm = e => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={resetForm}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
