import { Router } from 'express'
import UserController from '@/controllers/user.controller.js'
import { authentication, isAdmin } from '@/auth/authMiddleware.js'
import asyncHandler from '@/helpers/asyncHandler.js'

const userRouter = Router()

// Routes for logged-in user (authentication required)
userRouter.use(authentication)
userRouter.get('/profile', asyncHandler(UserController.getProfile))
userRouter.put('/profile', asyncHandler(UserController.updateProfile))

// Routes for admin (authentication and admin role required)
userRouter.get('/', isAdmin, asyncHandler(UserController.getAllUsers))
userRouter.post('/', isAdmin, asyncHandler(UserController.createUser))
userRouter.get('/:id', isAdmin, asyncHandler(UserController.getUserById))
userRouter.put('/:id', isAdmin, asyncHandler(UserController.updateUserByAdmin))
userRouter.delete('/:id', isAdmin, asyncHandler(UserController.deleteUser))

export default userRouter
