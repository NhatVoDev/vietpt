import { authentication } from '@/auth/authMiddleware.js'
import AuthController from '@/controllers/auth.controller.js'
import asyncHandler from '@/helpers/asyncHandler.js'
import { Router } from 'express'
const authRouter = Router()

authRouter.post('/login', asyncHandler(AuthController.login))
authRouter.post('/register', asyncHandler(AuthController.register))
authRouter.post('/forgot-password', asyncHandler(AuthController.forgotPassword))
authRouter.post('/reset-password', asyncHandler(AuthController.resetPassword))
authRouter.get('/verify-token', authentication, asyncHandler(AuthController.verifyToken))

/** --------Authentication--------- */
authRouter.use(authentication)
authRouter.post('/refresh-token', asyncHandler(AuthController.refreshToken))

export default authRouter
