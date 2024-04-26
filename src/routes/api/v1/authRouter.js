import express from 'express'
import 'reflect-metadata'
import container from '../../../config/inversify.config.js'
import IDENTIFIERS from '../../../config/identifiers.js'

export const authRouter = express.Router()

authRouter.get('/', (req, res, next) => {
  const authController = container.get(IDENTIFIERS.AuthController)
  authController.renderLogin(req, res, next)
})

// Handle OAuth callback
authRouter.get('/oauth', (req, res) => {
  const authController = container.get(IDENTIFIERS.AuthController)
  authController.handleOAuthCallback(req, res)
})

authRouter.get('/logout', (req, res) => {
  const authController = container.get(IDENTIFIERS.AuthController)
  authController.handleLogOut(req, res)
})
