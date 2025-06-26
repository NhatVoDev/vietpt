import { Router } from 'express'
import CommentController from '@/controllers/comment.controller.js'
import { authentication, isAdmin } from '@/auth/authMiddleware.js'
import asyncHandler from '@/helpers/asyncHandler.js'

const commentRouter = Router()

commentRouter.post('/', authentication, asyncHandler(CommentController.addComment))
commentRouter.get('/package/:packageId', asyncHandler(CommentController.getCommentsByPackage))
commentRouter.put('/:id', authentication, asyncHandler(CommentController.updateComment))
commentRouter.delete('/:id', authentication, asyncHandler(CommentController.deleteComment))
commentRouter.delete('/admin/:id', authentication, isAdmin, asyncHandler(CommentController.deleteCommentAdmin))

export default commentRouter
