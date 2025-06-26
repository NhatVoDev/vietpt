import { MediaSchema } from '@/models/media.model.js'
import { model, Schema } from 'mongoose'

const PromptSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    prompt: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
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
    description: {
      type: String,
      required: true
    },
    isFree: {
      type: Boolean,
      default: false
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

const PromptModel = model('Prompt', PromptSchema)
export default PromptModel
