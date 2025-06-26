import { z } from 'zod'

export const paymentSchema = z.object({
  currency: z.number().min(1, 'Vui lòng nhập giá tiền'),
  paymentMethod: z.enum(['cash', 'credit_card', 'momo', 'zalopay', 'paypal', 'bank_transfer']).optional(),
  status: z.enum(['pending', 'success', 'failed', 'cancelled', 'refunded']).optional()
})

export type PaymentSchema = z.infer<typeof paymentSchema>
