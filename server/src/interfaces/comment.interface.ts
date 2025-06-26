import { Types } from 'mongoose'

export interface IComment {
  content: string
  user: Types.ObjectId
  package: Types.ObjectId
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}
