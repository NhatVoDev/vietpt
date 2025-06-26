import { z } from 'zod'

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'Vui lòng nhập tên'),
  lastName: z.string().min(1, 'Vui lòng nhập họ'),
  gender: z.enum(['male', 'female', 'other']),
  country: z.string(),
  language: z.string()
})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>
