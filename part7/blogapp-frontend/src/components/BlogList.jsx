import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const BlogList = () => {
  const [visible, setVisible] = useState(false)
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['myBlogs'])

  const toggleVisibility = () => setVisible(!visible)

  if (!blogs) return null

  const sortBlogs = () => {
    blogs.sort((a, b) => b.likes - a.likes)
  }
  sortBlogs()

  return (
    <div>
      {visible ? (
        <BlogForm toggle={toggleVisibility} />
      ) : (
        <button className="showPost" onClick={toggleVisibility}>
          Post a blog!
        </button>
      )}
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
    </div>
  )
}

export default BlogList
