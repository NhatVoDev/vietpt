import { BadRequestError, ForbiddenError, NotFoundError } from '@/core/error.response.js'
import { CREATED, OK } from '@/core/success.response.js'
import { CustomRequest } from '@/interfaces/request.interface.js'
import { updateProfileSchema } from '@/schema/user.schema.js'
import UserService from '@/services/user.service.js'
import { Response } from 'express'

class UserController {
  public static async getProfile(req: CustomRequest, res: Response) {
    const userId = req.user._id.toString()

    if (!userId) {
      throw new ForbiddenError('Forbidden')
    }

    const profile = await UserService.getUser(userId)

    if (!profile) {
      throw new NotFoundError('Profile not found')
    }

    new OK({
      message: 'Get profile successfully',
      metadata: profile
    }).send(res)
  }
  public static async updateProfile(req: CustomRequest, res: Response) {
    const userId = req.user._id.toString()
    const { firstName, lastName, gender, country, language } = req.body
    const { error } = updateProfileSchema.safeParse({
      firstName,
      lastName,
      gender,
      country,
      language
    })
    if (error) {
      throw new BadRequestError(error.errors.map((err) => err.message).join(', '))
    }
    const profile = await UserService.updateProfile(userId, {
      firstName,
      lastName,
      gender,
      country,
      language
    })
    new OK({
      message: 'Update profile successfully',
      metadata: profile
    }).send(res)
  }

  // ================= ADMIN =================
  public static async getAllUsers(req: CustomRequest, res: Response) {
    const currentUserId = req.user._id.toString()
    const { search = '', page = 1, limit = 10 } = req.query
    const usersData = await UserService.getAllUsers(currentUserId, String(search), Number(page), Number(limit))
    new OK({
      message: 'Get all users successfully',
      metadata: usersData
    }).send(res)
  }

  public static async createUser(req: CustomRequest, res: Response) {
    // Should add validation schema
    const newUser = await UserService.createUserByAdmin(req.body)
    new CREATED({
      message: 'User created successfully',
      metadata: newUser
    }).send(res)
  }

  public static async updateUserByAdmin(req: CustomRequest, res: Response) {
    const userId = req.params.id
    // Should add validation schema
    const updatedUser = await UserService.updateUserByAdmin(userId, req.body)
    new OK({
      message: 'User updated successfully',
      metadata: updatedUser
    }).send(res)
  }

  public static async deleteUser(req: CustomRequest, res: Response) {
    const userId = req.params.id
    const user = await UserService.toggleUserActiveStatus(userId)
    const message = user.isActive ? 'User activated successfully' : 'User deactivated successfully'
    new OK({
      message,
      metadata: user
    }).send(res)
  }

  public static async getUserById(req: CustomRequest, res: Response) {
    const userId = req.params.id
    const user = await UserService.getUser(userId)
    new OK({
      message: 'Get user successfully',
      metadata: user
    }).send(res)
  }
}

export default UserController
