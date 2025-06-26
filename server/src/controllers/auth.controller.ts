import { HEADER } from '@/constants/app.constants.js'
import { OK } from '@/core/success.response.js'
import { CustomRequest } from '@/interfaces/request.interface.js'
import AuthService from '@/services/auth.service.js'
import { NextFunction, Request, Response } from 'express'

class AuthController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    new OK({
      message: 'Login successfully!',
      metadata: await AuthService.login(req.body)
    }).send(res)
  }

  public static async register(req: Request, res: Response, next: NextFunction) {
    new OK({
      message: 'Register successfully!',
      metadata: await AuthService.register(req.body)
    }).send(res)
  }

  public static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    new OK({
      message: 'Forgot password successfully!',
      metadata: await AuthService.forgotPassword(req.body)
    }).send(res)
  }

  public static async resetPassword(req: Request, res: Response, next: NextFunction) {
    new OK({
      message: 'Reset password successfully!',
      metadata: await AuthService.resetPassword(req.body)
    }).send(res)
  }

  public static async verifyToken(req: Request, res: Response, next: NextFunction) {
    new OK({
      message: 'Verify token successfully!'
    }).send(res)
  }

  public static async refreshToken(req: CustomRequest, res: Response, next: NextFunction) {
    new OK({
      message: 'Refresh token successfully!',
      metadata: await AuthService.refreshToken({
        user: req.user?._id
      })
    }).send(res)
  }
}

export default AuthController
