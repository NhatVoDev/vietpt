import { getTokenFromHeader } from '@/auth/authUtils.js'
import { HEADER } from '@/constants/app.constants.js'
import { ForbiddenError, UnauthorizedError } from '@/core/error.response.js'
import asyncHandler from '@/helpers/asyncHandler.js'
import { CustomRequest } from '@/interfaces/request.interface.js'
import { NextFunction, Response } from 'express'
import JWT from 'jsonwebtoken'

export const apiKey = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const key = req.headers[HEADER.API_KEY]?.toString()

  if (!key) {
    throw new ForbiddenError()
  }

  // const objectKey = await ApiKeyRepository.findKeyActiveByKey(key)

  // if (!objectKey) {
  //   throw new ForbiddenError()
  // }

  // req.objectKey = objectKey

  next()
}

export const permission = (permission: string) => async (req: CustomRequest, res: Response, next: NextFunction) => {
  // if (!req.objectKey?.permissions) {
  //   throw new ForbiddenError()
  // }

  // const isValidPermission = req.objectKey.permissions.includes(permission)

  // if (!isValidPermission) {
  //   throw new ForbiddenError()
  // }

  next()
}

export const authentication = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const accessKeyToken = process.env.ACCESS_TOKEN_SECRET || 'access-token-secret'
  const refreshKeyToken = process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret'

  const refreshToken = req.headers[HEADER.REFRESH_TOKEN]?.toString()
  if (refreshToken) {
    try {
      const decodeUser = JWT.verify(refreshToken, refreshKeyToken)
      req.user = decodeUser
      return next()
    } catch (error) {
      throw error
    }
  }

  const authHeader = req.headers.authorization

  const accessToken = getTokenFromHeader(authHeader)
  if (!accessToken) {
    throw new UnauthorizedError()
  }

  try {
    const decodeUser = JWT.verify(accessToken, accessKeyToken)
    req.user = decodeUser
    next()
  } catch (error) {
    throw error
  }
})

export const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.user.role !== 'admin') {
    throw new ForbiddenError('Require admin role')
  }
  return next()
}
