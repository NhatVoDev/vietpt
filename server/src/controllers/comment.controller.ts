import { OK, CREATED } from '@/core/success.response.js'
import { BadRequestError } from '@/core/error.response.js'
import { CustomRequest } from '@/interfaces/request.interface.js'
import CommentService from '@/services/comment.service.js'
import { Response } from 'express'

class CommentController {
  static async addComment(req: CustomRequest, res: Response) {
    const { content, package: packageId } = req.body
    if (!content || !packageId) {
      throw new BadRequestError('Content and package are required')
    }
    const comment = await CommentService.addComment({
      content,
      package: packageId,
      user: req.user._id,
      isActive: true
    })
    new CREATED({
      message: 'Comment added successfully',
      metadata: comment
    }).send(res)
  }

  static async getCommentsByPackage(req: CustomRequest, res: Response) {
    const { packageId } = req.params
    const { page = 1, limit = 10 } = req.query
    const data = await CommentService.getCommentsByPackage(packageId, Number(page), Number(limit))
    new OK({
      message: 'Get comments successfully',
      metadata: data
    }).send(res)
  }

  static async updateComment(req: CustomRequest, res: Response) {
    const { id } = req.params
    const { content } = req.body
    if (!content) throw new BadRequestError('Content is required')
    const comment = await CommentService.updateComment(id, req.user._id, content)
    new OK({
      message: 'Cập nhật bình luận thành công',
      metadata: comment
    }).send(res)
  }

  static async deleteComment(req: CustomRequest, res: Response) {
    const { id } = req.params
    const comment = await CommentService.deleteComment(id, req.user._id)
    new OK({
      message: 'Xóa bình luận thành công',
      metadata: comment
    }).send(res)
  }

  static async deleteCommentAdmin(req: CustomRequest, res: Response) {
    const { id } = req.params
    const comment = await CommentService.deleteCommentAdmin(id)
    new OK({
      message: 'Admin đã xóa bình luận thành công',
      metadata: comment
    }).send(res)
  }
}

export default CommentController
