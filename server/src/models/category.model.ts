import { ICategory } from '@/interfaces/category.interface.js'
import { Document, Model, model, Schema } from 'mongoose'

export interface ICategoryDocument extends ICategory, Document {}

const CategorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const CategoryModel: Model<ICategoryDocument> = model<ICategoryDocument>('Category', CategorySchema)
export default CategoryModel
