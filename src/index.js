import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import {
  notFound,
  getCars
} from './controllers'
import makeCallback from './utils/express-callback'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use((_, res, next) => {
  res.set({ Tk: '!' })
  next()
})
app.get('/cars', makeCallback(getCars))
app.use(makeCallback(notFound))

// listen for requests
app.listen(process.env.API_PORT, () => {
  console.log(`Server is listening on port ${process.env.API_PORT}`)
})

export default app
