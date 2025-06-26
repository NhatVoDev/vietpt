import { Types } from 'mongoose'

export interface IUser {
  email: string
  firstName: string
  lastName: string
  password: string
  avatar?: string
  role: 'admin' | 'user'
  gender: 'male' | 'female' | 'other'
  country: string
  language: string
  isActive: boolean
  isVerified: boolean
  isRoot: boolean
  createdAt?: Date
  updatedAt?: Date
  favorites: Types.ObjectId[]
  forgot: {
    newPassword: string
    code: string
  }

  // ✅ Thêm virtual
  fullName?: string
}
