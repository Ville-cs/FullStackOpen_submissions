import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const Users = () => {
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(['myUsers'])

  if (!users) return null

  return (
    <div>
      <h2>Users</h2>
      {users.map(user => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>
            {user.name} {user.blogs.length}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Users
