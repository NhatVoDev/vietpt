import { CREATED, OK } from '@/core/success.response.js'
import { CustomRequest } from '@/interfaces/request.interface.js'
import PackageService from '@/services/package.service.js'
import { Response } from 'express'

class PackageController {
  public static async getPackagesFavorites(req: CustomRequest, res: Response) {
    const { categoryId } = req.query
    const packages = await PackageService.getPackagesFavorites(req.user._id, categoryId as string)
    new OK({
      message: 'Lấy danh sách package yêu thích thành công!',
      metadata: { packages }
    }).send(res)
  }

  public static async favoritePackage(req: CustomRequest, res: Response) {
    const { id } = req.params
    const package_ = await PackageService.favoritePackage(id, req.user._id)
    new OK({
      message: 'Yêu thích package thành công!',
      metadata: { package: package_ }
    }).send(res)
  }

  public static async getPackageOwner(req: CustomRequest, res: Response) {
    console.log(req.user)
    const packages = await PackageService.getPackageOwner(req.user._id)
    new OK({
      message: 'Lấy danh sách package của người dùng thành công!',
      metadata: { packages }
    }).send(res)
  }

  public static async createPackage(
    req: CustomRequest & { files?: { thumbnail?: Express.Multer.File[]; images?: Express.Multer.File[] } },
    res: Response
  ) {
    const packageData = req.body
    const thumbnailFile = req.files?.thumbnail?.[0]
    const imageFiles = req.files?.images

    const newPackage = await PackageService.createPackage(req.user._id, packageData, thumbnailFile, imageFiles)

    new CREATED({
      message: 'Tạo package thành công!',
      metadata: { package: newPackage }
    }).send(res)
  }

  public static async updatePackage(
    req: CustomRequest & { files?: { thumbnail?: Express.Multer.File[]; images?: Express.Multer.File[] } },
    res: Response
  ) {
    const { id } = req.params
    const updateData = req.body
    const thumbnailFile = req.files?.thumbnail?.[0]
    const imageFiles = req.files?.images

    const updatedPackage = await PackageService.updatePackage(id, req.user._id, updateData, thumbnailFile, imageFiles)

    new OK({
      message: 'Cập nhật package thành công!',
      metadata: { package: updatedPackage }
    }).send(res)
  }

  public static async deletePackage(req: CustomRequest, res: Response) {
    const { id } = req.params
    await PackageService.deletePackage(id, req.user._id)

    new OK({
      message: 'Xóa package thành công!'
    }).send(res)
  }

  public static async getPackages(req: CustomRequest, res: Response) {
    const { category, search, tags, minPrice, maxPrice, page, limit } = req.query

    const result = await PackageService.getPackages({
      category: category as string,
      search: search as string,
      tags: tags ? ((Array.isArray(tags) ? tags : [tags]) as string[]) : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined
    })

    new OK({
      message: 'Lấy danh sách package thành công!',
      metadata: result
    }).send(res)
  }

  public static async getPackageDetail(req: CustomRequest, res: Response) {
    const { id } = req.params
    const package_ = await PackageService.getPackageDetail(id)

    new OK({
      message: 'Lấy chi tiết package thành công!',
      metadata: { package: package_ }
    }).send(res)
  }
}

export default PackageController
