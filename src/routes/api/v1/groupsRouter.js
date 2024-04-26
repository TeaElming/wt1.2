import express from 'express'
import 'reflect-metadata'
import container from '../../../config/inversify.config.js'
import IDENTIFIERS from '../../../config/identifiers.js'

export const groupsRouter = express.Router()

groupsRouter.get('/', (req, res, next) => {
  const groupController = container.get(IDENTIFIERS.GroupController)
  groupController.renderGroupsAndProjectsPage(req, res, next)
})
