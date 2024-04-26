import express from 'express'
import 'reflect-metadata'
import container from '../../../config/inversify.config.js'
import IDENTIFIERS from '../../../config/identifiers.js'

export const profileRouter = express.Router()

profileRouter.get('/', (req, res, next) => {
  const profileController = container.get(IDENTIFIERS.ProfileController)
  profileController.renderProfilePage(req, res, next)
})
