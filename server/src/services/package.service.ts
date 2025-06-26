import { BadRequestError } from '@/core/error.response.js'
import { IPackage } from '@/interfaces/package.interface.js'
import PackageModel from '@/models/package.model.js'
import UserModel from '@/models/user.model.js'
import UploadService from './upload.service.js'
import { Types } from 'mongoose'
import { IMedia } from '@/interfaces/media.interfaces.js'

class PackageService {
  private static toMedia(cloudinaryResponse: any) {
    return {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.url,
      secure_url: cloudinaryResponse.secure_url,
      resource_type: cloudinaryResponse.resource_type,
      format: cloudinaryResponse.format,
      folder: cloudinaryResponse.folder,
      width: cloudinaryResponse.width,
      height: cloudinaryResponse.height,
      duration: cloudinaryResponse.duration
    }
  }

  public static async getPackageOwner(userId: string) {
    const packages = await PackageModel.find({ user: userId, isActive: true })
      .populate('category')
      .populate('user', 'firstName lastName avatar')
    return packages
  }

  public static async getPackagesFavorites(userId: string, categoryId?: string) {
    const user = await UserModel.findById(userId)

    if (!user) {
      throw new BadRequestError('User không tồn tại!')
    }

    const favoritesArray = Array.isArray(user.favorites) ? user.favorites : []
    const query = categoryId
      ? { _id: { $in: favoritesArray }, category: categoryId, isActive: true }
      : { _id: { $in: favoritesArray }, isActive: true }

    const packages = await PackageModel.find(query)
      .populate('category')
      .populate('user', 'firstName lastName avatar')
      .sort({ createdAt: -1 })

    return packages
  }

  public static async favoritePackage(packageId: string, userId: string) {
    const package_ = await PackageModel.findById(packageId)
    if (!package_) {
      throw new BadRequestError('Package không tồn tại!')
    }

    const user = await UserModel.findById(userId)
    if (!user) {
      throw new BadRequestError('User không tồn tại!')
    }

    if (user.favorites.includes(new Types.ObjectId(packageId))) {
      user.favorites = user.favorites.filter((id) => id.toString() !== packageId)
      package_.totalLikes -= 1
    } else {
      user.favorites.push(new Types.ObjectId(packageId))
      package_.totalLikes += 1
    }
    await package_.save()
    await user.save()

    return user
  }

  public static async createPackage(
    userId: string,
    packageData: {
      name: string
      description: string
      price: number
      category: string
      tags: string[]
      prompts: { question: string; answer: string }[]
    },
    thumbnailFile?: Express.Multer.File,
    imageFiles?: Express.Multer.File[]
  ): Promise<IPackage> {
    if (typeof packageData.prompts === 'string') {
      packageData.prompts = JSON.parse(packageData.prompts)
    }
    if (typeof packageData.tags === 'string') {
      packageData.tags = JSON.parse(packageData.tags)
    }

    if (!thumbnailFile) {
      throw new BadRequestError('Thumbnail là bắt buộc!')
    }
    const thumbnail = await UploadService.uploadAvatar(thumbnailFile)

    const images = []
    if (imageFiles?.length) {
      for (const file of imageFiles) {
        const uploadedImage = await UploadService.uploadAvatar(file)
        images.push(this.toMedia(uploadedImage))
      }
    }

    const newPackage = await PackageModel.create({
      ...packageData,
      user: userId,
      thumbnail: this.toMedia(thumbnail),
      images: images,
      isActive: true
    })

    return newPackage.populate(['category', 'user'])
  }

  public static async updatePackage(
    packageId: string,
    userId: string,
    updateData: Partial<{
      name: string
      description: string
      price: number
      category: string
      tags: string[]
      prompts: { question: string; answer: string }[]
      isActive: boolean
      thumbnail: IMedia
      images: IMedia[]
      existingImages: string
    }>,
    thumbnailFile?: Express.Multer.File,
    imageFiles?: Express.Multer.File[]
  ): Promise<IPackage> {
    const existingPackage = await PackageModel.findOne({
      _id: packageId,
      user: userId
    })

    if (!existingPackage) {
      throw new BadRequestError('Package không tồn tại hoặc không có quyền chỉnh sửa!')
    }

    if (typeof updateData.prompts === 'string') {
      try {
        updateData.prompts = JSON.parse(updateData.prompts)
      } catch (error) {
        throw new BadRequestError('Dữ liệu prompts không hợp lệ!')
      }
    }

    if (typeof updateData.tags === 'string') {
      try {
        updateData.tags = JSON.parse(updateData.tags)
      } catch (error) {
        throw new BadRequestError('Dữ liệu tags không hợp lệ!')
      }
    }

    let existingImages: IMedia[] = []
    if (typeof updateData.existingImages === 'string') {
      try {
        existingImages = JSON.parse(updateData.existingImages)
        delete updateData.existingImages
      } catch (error) {
        throw new BadRequestError('Dữ liệu ảnh không hợp lệ!')
      }
    }

    if (thumbnailFile) {
      const newThumbnail = await UploadService.uploadAvatar(thumbnailFile)
      updateData.thumbnail = this.toMedia(newThumbnail)
    }

    const newImages: IMedia[] = []
    if (imageFiles?.length) {
      for (const file of imageFiles) {
        const uploadedImage = await UploadService.uploadAvatar(file)
        newImages.push(this.toMedia(uploadedImage))
      }
    }

    updateData.images = [...existingImages, ...newImages]

    if (Array.isArray(updateData.prompts)) {
      updateData.prompts = updateData.prompts.map(({ question, answer }) => ({
        question,
        answer
      }))
    }

    const updatedPackage = await PackageModel.findByIdAndUpdate(
      packageId,
      { $set: updateData },
      { new: true }
    ).populate(['category', 'user'])

    if (!updatedPackage) {
      throw new BadRequestError('Cập nhật package thất bại!')
    }

    return updatedPackage
  }

  public static async deletePackage(packageId: string, userId: string): Promise<void> {
    const userFind = await UserModel.findById(userId)

    if (!userFind) {
      throw new BadRequestError('User không tồn tại!')
    }

    const existingPackage = await PackageModel.findOne({
      _id: packageId,
      user: userId
    })

    if (!existingPackage && userFind.role !== 'admin') {
      throw new BadRequestError('Package không tồn tại hoặc không có quyền xóa!')
    }

    await PackageModel.findByIdAndUpdate(packageId, { isActive: false })
  }

  public static async getPackages(query: {
    category?: string
    search?: string
    tags?: string[]
    minPrice?: number
    maxPrice?: number
    page?: number
    limit?: number
  }) {
    const { category, search, tags, minPrice, maxPrice, page = 1, limit = 10 } = query

    const filter: any = { isActive: true }

    if (category) {
      filter.category = new Types.ObjectId(category)
    }

    if (search) {
      filter.$or = [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }]
    }

    if (tags?.length) {
      filter.tags = { $in: tags }
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {}
      if (minPrice !== undefined) filter.price.$gte = minPrice
      if (maxPrice !== undefined) filter.price.$lte = maxPrice
    }

    const skip = (page - 1) * limit
    const [packages, total] = await Promise.all([
      PackageModel.find(filter).populate(['category', 'user']).sort({ createdAt: -1 }).skip(skip).limit(limit),
      PackageModel.countDocuments(filter)
    ])

    return {
      packages,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  public static async getPackageDetail(packageId: string): Promise<IPackage> {
    const package_ = await PackageModel.findOne({
      _id: packageId,
      isActive: true
    })
      .populate(['category', 'user'])
      .lean()

    if (!package_) {
      throw new BadRequestError('Package không tồn tại!')
    }

    return package_
  }
}

export default PackageService
