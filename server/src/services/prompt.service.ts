import { NotFoundError } from '@/core/error.response.js'
import PromptModel from '@/models/prompt.model.js'
import UserModel from '@/models/user.model.js'

class PromptService {
  public static async getFavourite(userId: string, categoryId?: string) {
    const user = await UserModel.findById(userId)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    const prompts = await PromptModel.find({
      _id: { $in: user.favorites },
      category: categoryId ? categoryId : { $exists: true }
    }).populate('owner', 'firstName lastName avatar')

    return prompts
  }
  public static async getPromptOwner(userId: string) {
    const prompts = await PromptModel.find({ owner: userId })
      .populate('owner', 'firstName lastName avatar')
      .populate('category', 'name')
    return prompts
  }
}

export default PromptService
