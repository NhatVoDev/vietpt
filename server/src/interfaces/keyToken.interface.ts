import { Types } from 'mongoose'

export interface IKeyToken {
  user: Types.ObjectId
  // deviceId: string
  accessTokenKey: string
  refreshTokenKey: string
  refreshToken: string
  refreshTokensUsed: string[]
  createdAt?: Date
  updatedAt?: Date
}
