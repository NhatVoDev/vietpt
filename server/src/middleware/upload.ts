import { BadRequestError } from '@/core/error.response.js'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 //5MB
  },
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new BadRequestError('Không hỗ trợ định dạng file upload!'))
    }
  }
})

export default upload
