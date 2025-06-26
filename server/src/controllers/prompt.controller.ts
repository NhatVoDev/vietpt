import { OK } from '@/core/success.response.js'
import { CustomRequest } from '@/interfaces/request.interface.js'
import PromptService from '@/services/prompt.service.js'
import { Response } from 'express'

class PromptController {
  public static async getFavourite(req: CustomRequest, res: Response) {
    new OK({
      message: 'Prompts fetched successfully',
      metadata: await PromptService.getFavourite(req.user._id, req.query?.categoryId as string)
    }).send(res)
  }
  public static async getPromptOwner(req: CustomRequest, res: Response) {
    new OK({
      message: 'Prompts fetched successfully',
      metadata: await PromptService.getPromptOwner(req.user._id)
    }).send(res)
  }
}

export default PromptController
