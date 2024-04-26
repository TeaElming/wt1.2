import express from 'express'
import 'reflect-metadata'
import container from '../../../config/inversify.config.js'
import IDENTIFIERS from '../../../config/identifiers.js'

export const activitiesRouter = express.Router()

activitiesRouter.get('/', (req, res, next) => {
  const profileController = container.get(IDENTIFIERS.ProfileController)
  profileController.renderActivitiesPage(req, res, next)
})
