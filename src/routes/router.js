import express from 'express'
import 'reflect-metadata'
import { authRouter } from './api/v1/authRouter.js'
import { profileRouter } from './api/v1/profileRouter.js'
import { activitiesRouter } from './api/v1/activitiesRouter.js'
import { groupsRouter } from './api/v1/groupsRouter.js'
import { homeRouter } from './api/v1/homeRouter.js'

export const router = express.Router()

router.use('/', authRouter)

router.use('/home', homeRouter)

router.use('/profile', profileRouter)

router.use('/activities', activitiesRouter)

router.use('/groups', groupsRouter)
