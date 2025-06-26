import { authentication } from '@/auth/authMiddleware.js'
import UploadController from '@/controllers/upload.controller.js'
import asyncHandler from '@/helpers/asyncHandler.js'
import upload from '@/middleware/upload.js'
import { Router } from 'express'

const uploadRouter = Router()

uploadRouter.use(authentication)
uploadRouter.post('/avatar', upload.single('avatar'), asyncHandler(UploadController.uploadAvatar))

export default uploadRouter
