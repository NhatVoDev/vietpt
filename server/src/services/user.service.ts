import { BadRequestError, NotFoundError } from '@/core/error.response.js'
import UserModel from '@/models/user.model.js'
import { UpdateProfileSchema } from '@/schema/user.schema.js'
import bcrypt from 'bcryptjs'

class UserService {
  public static async getUser(userId: string) {
    const user = await UserModel.findById(userId).select('-password')
    if (!user) {
      throw new NotFoundError('User not found')
    }
    return user
  }
  public static async updateProfile(userId: string, data: UpdateProfileSchema) {
    const user = await UserModel.findByIdAndUpdate(userId, data, { new: true }).select('-password')
    if (!user) {
      throw new NotFoundError('User not found')
    }
    return user
  }
  // New methods for admin
  public static async getAllUsers(currentUserId: string, search = '', page = 1, limit = 10) {
    const query: any = {
      _id: { $ne: currentUserId },
      isRoot: { $ne: true }
    }
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }
    const skip = (page - 1) * limit
    const [users, total] = await Promise.all([
      UserModel.find(query).select('-password').skip(skip).limit(limit),
      UserModel.countDocuments(query)
    ])
    const totalPages = Math.ceil(total / limit)
    return {
      users,
      pagination: {
        total,
        totalPages,
        page,
        limit
      }
    }
  }

  public static async createUserByAdmin(data: any) {
    const { email, password, firstName, lastName } = data

    const existingUser = await UserModel.findOne({ email }).lean()
    if (existingUser) {
      throw new BadRequestError('Email already registered')
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = await UserModel.create({
      email,
      password: passwordHash,
      firstName,
      lastName
    })

    // Do not return password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...returnUser } = newUser.toObject()

    return returnUser
  }

  public static async updateUserByAdmin(userId: string, data: any) {
    const { firstName, lastName, gender, country, language, role, isActive } = data

    const user = await UserModel.findById(userId)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    if (user.isRoot) {
      throw new BadRequestError('Cannot modify root user')
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          firstName,
          lastName,
          gender,
          country,
          language,
          role,
          isActive
        }
      },
      { new: true }
    ).select('-password')

    return updatedUser
  }

  public static async toggleUserActiveStatus(userId: string) {
    const user = await UserModel.findById(userId)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    if (user.isRoot) {
      throw new BadRequestError('Cannot modify root user')
    }

    user.isActive = !user.isActive
    await user.save()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...returnUser } = user.toObject()
    return returnUser
  }
}

export default UserService
