import express from 'express'
import 'reflect-metadata'
import container from '../../../config/inversify.config.js'
import IDENTIFIERS from '../../../config/identifiers.js'

export const homeRouter = express.Router()

homeRouter.get('/', (req, res, next) => {
  const homeController = container.get(IDENTIFIERS.HomeController)
  homeController.renderHomePage(req, res, next)
})
