import express from 'express'
import expressLayouts from 'express-ejs-layouts'

import cors from 'cors'

import { config } from 'dotenv'
import { router } from './routes/router.js'

import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

config() // for dotenv

try {
  const app = express()
  app.use(express.json())

  const directoryFullName = dirname(fileURLToPath(import.meta.url)) // get directory name for specific module
  app.use(express.static(join(directoryFullName, '..', 'public'))) // serve static files

  // Apply CORS middleware globally
  app.use(cors({
    origin: process.env.BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }))

  app.use((req, res, next) => {
    // Prevents iframe embedding and clickjacking
    res.setHeader('X-Frame-Options', 'DENY')
    // Enforce all content to be loaded via HTTPS
    res.setHeader('Content-Security-Policy', "default-src 'self' https:; img-src 'self' https: data:;")
    // Set the Referrer-Policy to strict-origin-when-cross-origin
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

    next()
  })

  app.use((req, res, next) => {
    res.locals.baseURL = process.env.BASE_URL || '/'
    next()
  })

  // View engine setup.
  app.set('view engine', 'ejs')
  app.set('views', join(directoryFullName, 'views'))
  app.use(expressLayouts)
  app.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))

  app.use('/', router)

  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
