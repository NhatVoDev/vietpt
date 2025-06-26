import { OK } from '@/core/success.response.js'
import UploadService from '@/services/upload.service.js'
import { NextFunction, Request, Response } from 'express'

class UploadController {
  public static async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    new OK({
      message: 'Upload avatar successful!',
      metadata: await UploadService.uploadAvatar(req.file)
    }).send(res)
  }
}

export default UploadController
