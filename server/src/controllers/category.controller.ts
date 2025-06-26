import { OK } from '@/core/success.response.js'
import CategoryService from '@/services/category.service.js'
import { NextFunction, Request, Response } from 'express'

class CategoryController {
  public static async getAllCategories(req: Request, res: Response, next: NextFunction) {
    new OK({
      message: 'Get all categories successfully!',
      metadata: await CategoryService.getAllCategories()
    }).send(res)
  }
}

export default CategoryController
