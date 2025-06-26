import { Schema } from 'mongoose'

export const MediaSchema = new Schema(
  {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
    secure_url: { type: String },
    resource_type: { type: String, enum: ['image', 'video', 'raw'], required: true },
    format: { type: String },
    folder: { type: String },
    width: { type: Number },
    height: { type: Number },
    duration: { type: Number } // dùng cho video
  },
  { _id: false } // 🔥 tối ưu khi embed
)
