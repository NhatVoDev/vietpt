import { IComment } from '@/interfaces/comment.interface.js'
import { Document, model, Schema } from 'mongoose'

export interface ICommentDocument extends IComment, Document {}

const CommentSchema = new Schema<ICommentDocument>(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    package: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
)

const CommentModel = model<ICommentDocument>('Comment', CommentSchema)
export default CommentModel
