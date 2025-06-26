import { createTokensPair } from '@/auth/authUtils.js'
import { BadRequestError, ForbiddenError, UnauthorizedError } from '@/core/error.response.js'
import UserModel from '@/models/user.model.js'
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
  loginSchema,
  LoginSchema,
  registerSchema,
  RegisterSchema,
  resetPasswordSchema,
  ResetPasswordSchema
} from '@/schema/auth.schema.js'
import { sendPasswordResetEmail } from '@/utils/email.util.js'
import { pickFields } from '@/utils/index.js'
import bcrypt from 'bcryptjs'

class AuthService {
  /**
   * @param {email, password, refreshToken} req.body
   * @returns {Promise<void>}
   * 
   1 - check email in dbs
   2 - match password
   3 - create AT vs RT and save
   4 - generate tokens
   5 - get data return login
   */
  public static async login(body: LoginSchema) {
    const { email, password } = body

    const { error } = loginSchema.safeParse(body)
    if (error) {
      throw new BadRequestError(error.message)
    }

    const user = await UserModel.findOne({ email })

    // 1
    if (!user) {
      throw new BadRequestError('Email hoặc mật khẩu không chính xác!')
    } else if (!user.isActive) {
      throw new BadRequestError('Tài khoản đã bị khóa!')
    }

    // 2
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new BadRequestError('Email hoặc mật khẩu không chính xác!')
    }

    // 3
    const accessKeyToken = process.env.ACCESS_TOKEN_SECRET || 'access-token-secret'
    const refreshKeyToken = process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret'

    // 4
    const tokens = createTokensPair({
      payload: pickFields(user, ['_id', 'email', 'fullName', 'avatar', 'role', 'isPremium', 'isVerified']),
      accessTokenKey: accessKeyToken,
      refreshTokenKey: refreshKeyToken
    })

    return {
      user: pickFields(user, ['_id', 'email', 'fullName', 'avatar', 'role', 'isPremium', 'isVerified', 'favorites']),
      tokens
    }
  }

  public static async register(body: RegisterSchema) {
    /**
     * 1 - Validate data
     * 2 - Check email in dbs
     * 3 - Hash password
     * 4 - Create user
     */
    const { email, password, firstName, lastName } = body
    const { error } = registerSchema.safeParse({ email, password, firstName, lastName })
    if (error) {
      throw new BadRequestError(error.message)
    }

    const user = await UserModel.findOne({ email }).lean({ virtuals: true })
    if (user) {
      throw new BadRequestError('Email already exists!')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({
      email,
      firstName,
      lastName,
      password: hashedPassword
    })

    await newUser.save()

    return {
      user: pickFields(newUser, ['_id', 'email', 'fullName', 'avatar', 'role', 'isPremium', 'isVerified', 'favorites'])
    }
  }

  public static async forgotPassword(body: ForgotPasswordSchema) {
    const { email, password } = body
    const { error } = forgotPasswordSchema.safeParse({ email, password })
    if (error) {
      throw new BadRequestError(error.message)
    }

    // random code 6 digits
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    const user = await UserModel.findOne({ email, isActive: true, role: 'user' })
    if (!user) {
      throw new BadRequestError('Email không tồn tại!')
    }

    await UserModel.findByIdAndUpdate(user._id, {
      $set: {
        'forgot.code': code,
        'forgot.newPassword': password
      }
    })

    await sendPasswordResetEmail(email, code)

    return {
      message: 'Mã đã được gửi đến email!'
    }
  }

  public static async resetPassword(body: ResetPasswordSchema) {
    const { email, code } = body
    const { error } = resetPasswordSchema.safeParse({ email, code })
    if (error) {
      throw new BadRequestError(error.errors.map((err) => err.message).join(', '))
    }

    const user = await UserModel.findOne({ email })

    if (!user) {
      throw new BadRequestError('Email not registered!')
    }

    if (user.forgot.code !== code) {
      throw new BadRequestError('Invalid code!')
    }

    const hashedPassword = await bcrypt.hash(user.forgot.newPassword, 10)

    await UserModel.findByIdAndUpdate(user._id, {
      $set: {
        password: hashedPassword,
        'forgot.code': null,
        'forgot.newPassword': null
      }
    })

    return {
      message: 'Password reset successfully!'
    }
  }

  public static async refreshToken({ user }: { user?: string }) {
    const userFound = await UserModel.findById(user)

    if (!userFound) {
      throw new BadRequestError('User not found!')
    }

    const accessKeyToken = process.env.ACCESS_TOKEN_SECRET || 'access-token-secret'
    const refreshKeyToken = process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret'

    const tokens = createTokensPair({
      payload: pickFields(userFound, ['_id', 'email', 'fullName', 'avatar', 'role', 'isPremium', 'isVerified']),
      accessTokenKey: accessKeyToken,
      refreshTokenKey: refreshKeyToken
    })

    return {
      user: pickFields(userFound, [
        '_id',
        'email',
        'fullName',
        'avatar',
        'role',
        'isPremium',
        'isVerified',
        'favorites'
      ]),
      tokens
    }
  }
}

export default AuthService
