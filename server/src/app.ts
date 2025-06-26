import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import { globalErrorHandler, notFoundHandler } from '@/middleware/errorHandler.js'
import router from '@/routers/index.js'
import database from '@/database/database.js'

const app = express()

database.connectDB()

// Middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// Routes
app.use('/api', router)

// Error handling
app.use(notFoundHandler)
app.use(globalErrorHandler)

export default app
