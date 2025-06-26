import { IPackage } from '@/interfaces/package.interface.js'
import { MediaSchema } from '@/models/media.model.js'
import { model, Schema } from 'mongoose'

const PackageSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    totalLikes: {
      type: Number,
      default: 0
    },
    thumbnail: {
      type: MediaSchema,
      required: true
    },
    tags: {
      type: [String],
      required: true
    },
    images: {
      type: [MediaSchema],
      default: []
    },
    prompts: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true }
      }
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

export default model<IPackage>('Package', PackageSchema)
