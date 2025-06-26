import { IMedia } from '@/interfaces/media.interfaces.js'
import { Types } from 'mongoose'

export interface IPackage {
  name: string
  description: string
  price: number
  category: Types.ObjectId
  thumbnail: IMedia
  tags: string[]
  images: IMedia[]
  prompts: { question: string; answer: string }[]
  user: Types.ObjectId
  isActive: boolean
  totalLikes: number
  createdAt?: Date
  updatedAt?: Date
}

export interface ICreatePackageDto {
  name: string
  description: string
  price: number
  duration: number
  type: 'standard' | 'premium' | 'enterprise'
  status: 'active' | 'inactive' | 'draft'
  features: string[]
  thumbnail?: Express.Multer.File
}
