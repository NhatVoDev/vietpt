import { authentication } from '@/auth/authMiddleware.js'
import PromptController from '@/controllers/prompt.controller.js'
import asyncHandler from '@/helpers/asyncHandler.js'
import { Router } from 'express'
const promptRouter = Router()

promptRouter.use(authentication)
promptRouter.get('/favourite', asyncHandler(PromptController.getFavourite))
promptRouter.get('/owner', asyncHandler(PromptController.getPromptOwner))

export default promptRouter
