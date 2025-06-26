import { IMedia } from '@/interfaces/media.interfaces.js'
import { Types } from 'mongoose'

export interface IPrompt {
  owner: Types.ObjectId
  prompt: string
  category: Types.ObjectId
  thumbnail: IMedia
  tags: string[]
  images: IMedia[]
  description: string
  isFree: boolean
  isVerified: boolean
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}
