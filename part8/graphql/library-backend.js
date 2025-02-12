const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
require('dotenv').config()
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
  username: String!
  favoriteGenre: String!
  id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ): Book
    addAuthor(
      name: String!,
      born: Int,
      bookCount: Int
    ): Author
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const results = await Book.find({}).populate('author', {
        name: 1,
        born: 1,
        bookCount: 1,
      })
      if (args.author && args.genre) {
        return results.filter(
          book =>
            book.author.name === args.author && book.genres.includes(args.genre)
        )
      } else if (args.author) {
        return results.filter(book => book.author.name === args.author)
      } else if (args.genre) {
        return results.filter(book => book.genres.includes(args.genre))
      }
      return results
    },
    allAuthors: async () => {
      return await Author.find({})
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Login to add a book', {
          extensions: { code: 'NO_AUTHORIZATION' },
        })
      }
      try {
        const book = new Book({ ...args })
        result = await book.save()
        const author = await Author.findById(result.author)
        author.bookCount += 1
        await author.save()
        result.author = author
        return result
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name, error },
        })
      }
    },
    addAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Login to add an author', {
          extensions: { code: 'NO_AUTHORIZATION' },
        })
      }
      try {
        const author = new Author({ ...args })
        if (!author.bookCount) {
          author.bookCount = 0
        }
        return author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name, error },
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Login to edit an author', {
          extensions: { code: 'NO_AUTHORIZATION' },
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      const updatedAuthor = await Author.findByIdAndUpdate(author.id, author, {
        new: true,
      })
      return updatedAuthor
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      return user.save().catch(error => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
