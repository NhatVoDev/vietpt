import CommentModel from '@/models/comment.model.js'
import { IComment } from '@/interfaces/comment.interface.js'

class CommentService {
  static async addComment(data: IComment) {
    const comment = await CommentModel.create(data)
    return comment
  }

  static async getCommentsByPackage(packageId: string, page = 1, limit = 10) {
    const query = { package: packageId, isActive: true }
    const skip = (page - 1) * limit
    const [comments, total] = await Promise.all([
      CommentModel.find(query)
        .populate('user', 'firstName lastName avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      CommentModel.countDocuments(query)
    ])
    const totalPages = Math.ceil(total / limit)
    return {
      comments,
      pagination: { total, totalPages, page, limit }
    }
  }

  static async updateComment(commentId: string, userId: string, content: string) {
    const comment = await CommentModel.findOne({ _id: commentId, user: userId })
    if (!comment) throw new Error('Không tìm thấy bình luận hoặc không có quyền sửa')
    comment.content = content
    await comment.save()
    return comment
  }

  static async deleteComment(commentId: string, userId: string) {
    const comment = await CommentModel.findOne({ _id: commentId, user: userId })
    if (!comment) throw new Error('Không tìm thấy bình luận hoặc không có quyền xóa')
    comment.isActive = false
    await comment.save()
    return comment
  }

  static async deleteCommentAdmin(commentId: string) {
    const comment = await CommentModel.findById(commentId)
    if (!comment) throw new Error('Không tìm thấy bình luận')
    comment.isActive = false
    await comment.save()
    return comment
  }
}

export default CommentService
