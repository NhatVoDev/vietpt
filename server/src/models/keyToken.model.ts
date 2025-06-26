import { IKeyToken } from '@/interfaces/keyToken.interface.js'
import { Document, Model, model, Schema } from 'mongoose'

export interface IKeyTokenDocument extends IKeyToken, Document {}

const keyTokenSchema = new Schema<IKeyTokenDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    accessTokenKey: {
      type: String,
      required: true
    },
    refreshTokenKey: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      required: true
    },
    refreshTokensUsed: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
)

const KeyTokenModel: Model<IKeyTokenDocument> = model<IKeyTokenDocument>('KeyToken', keyTokenSchema)
export default KeyTokenModel
