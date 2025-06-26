import { authentication } from '@/auth/authMiddleware.js'
import CategoryController from '@/controllers/category.controller.js'
import asyncHandler from '@/helpers/asyncHandler.js'
import { Router } from 'express'

const categoryRouter = Router()

categoryRouter.use(authentication)
categoryRouter.get('/', asyncHandler(CategoryController.getAllCategories))

export default categoryRouter
