import { IUser } from '@/interfaces/user.interface.js'
import { Schema, Document, model, Model } from 'mongoose'

export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must be at least 8 characters long']
    },
    avatar: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default: 'other'
    },
    country: {
      type: String
    },
    language: {
      type: String
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    favorites: {
      type: [Schema.Types.ObjectId],
      ref: 'Package',
      default: []
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isRoot: {
      type: Boolean,
      default: false
    },
    forgot: {
      newPassword: {
        type: String,
        default: null
      },
      code: {
        type: String,
        default: null
      }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

UserSchema.virtual('fullName').get(function () {
  return `${this.lastName} ${this.firstName}`
})

const UserModel: Model<IUserDocument> = model<IUserDocument>('User', UserSchema)
export default UserModel
