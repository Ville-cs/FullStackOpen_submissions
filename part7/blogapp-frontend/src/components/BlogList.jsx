import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const BlogList = () => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['myBlogs'])

  if (!blogs) return null

  const sortBlogs = () => {
    blogs.sort((a, b) => b.likes - a.likes)
  }
  sortBlogs()

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs.map(blog => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
              <TableCell>{blog.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogList
