import { Router } from 'express'
import { authentication } from '@/auth/authMiddleware.js'
import PackageController from '@/controllers/package.controller.js'
import asyncHandler from '@/helpers/asyncHandler.js'
import upload from '@/middleware/upload.js'

const packageRouter = Router()

// Public routes
packageRouter.get('/', asyncHandler(PackageController.getPackages))
packageRouter.get('/detail/:id', asyncHandler(PackageController.getPackageDetail))
// Protected routes
packageRouter.use(authentication)

// Upload middleware cho routes cần upload file
const uploadFields = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'images', maxCount: 5 }
])

packageRouter.put('/favorite/:id', asyncHandler(PackageController.favoritePackage))
packageRouter.post('/', uploadFields, asyncHandler(PackageController.createPackage))
packageRouter.put('/:id', uploadFields, asyncHandler(PackageController.updatePackage))
packageRouter.delete('/:id', asyncHandler(PackageController.deletePackage))
packageRouter.get('/favorites', asyncHandler(PackageController.getPackagesFavorites))
packageRouter.get('/owner', asyncHandler(PackageController.getPackageOwner))

export default packageRouter
