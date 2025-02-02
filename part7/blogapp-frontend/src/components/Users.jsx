import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from '@mui/material'

const Users = () => {
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(['myUsers'])

  if (!users) return null

  return (
    <Paper
      sx={{
        maxWidth: 'fit-content',
        marginInline: 'auto',
        marginTop: 5,
      }}
    >
      <h2 style={{ margin: 10 }}>Blogapp users</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Users</b>
              </TableCell>
              <TableCell>
                <b>Blogs posted</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell align="center">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default Users
