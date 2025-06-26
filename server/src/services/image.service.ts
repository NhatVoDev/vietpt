import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

export class ImageService {
  private readonly uploadDir: string
  private readonly maxWidth: number = 1920 // Giới hạn chiều rộng tối đa
  private readonly quality: number = 80 // Chất lượng ảnh (0-100)

  constructor() {
    this.uploadDir = path.join(__dirname, '../../uploads')
  }

  async optimizeImage(file: Express.Multer.File): Promise<string> {
    try {
      const optimizedFileName = `optimized-${uuidv4()}${path.extname(file.filename)}`
      const outputPath = path.join(this.uploadDir, optimizedFileName)

      // Đọc metadata của ảnh
      const metadata = await sharp(file.path).metadata()

      // Tính toán kích thước mới giữ nguyên tỷ lệ
      const width = metadata.width && metadata.width > this.maxWidth ? this.maxWidth : metadata.width

      // Tối ưu hóa ảnh
      await sharp(file.path)
        .resize({
          width,
          withoutEnlargement: true // Không phóng to ảnh nhỏ
        })
        .jpeg({ quality: this.quality })
        .toFile(outputPath)

      // Xóa file gốc
      fs.unlinkSync(file.path)

      return optimizedFileName
    } catch (error) {
      // Nếu có lỗi, xóa file gốc và ném lỗi
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path)
      }
      throw error
    }
  }

  async deleteImage(filename: string): Promise<void> {
    const filePath = path.join(this.uploadDir, filename)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }

  getImageUrl(filename: string): string {
    return `/uploads/${filename}`
  }
}
