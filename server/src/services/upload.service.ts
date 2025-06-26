import { BadRequestError } from '@/core/error.response.js'
import { UploadApiResponse } from 'cloudinary'
import cloudinary from 'configs/cloudinary.config.js'

class UploadService {
  public static uploadAvatar = async (file?: Express.Multer.File): Promise<UploadApiResponse> => {
    if (!file?.buffer) {
      throw new BadRequestError('No file uploaded!')
    }

    return new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'avatars' }, (err, result) => {
        if (err || !result) {
          reject(new Error(err?.message || 'Upload failed'))
        } else {
          resolve(result)
        }
      })

      stream.end(file.buffer)
    })
  }
}

export default UploadService
