import { BadRequestError } from '@/core/error.response.js'
import { OK } from '@/core/success.response.js'
import { CustomRequest } from '@/interfaces/request.interface.js'
import { paymentSchema } from '@/schema/payment.schema.js'
import paymentService from '@/services/payment.service.js'
import { Response } from 'express'

class PaymentController {
  public static async createPayment(req: CustomRequest, res: Response) {
    const { currency, paymentMethod, status, packageId } = req.body
    const { error } = paymentSchema.safeParse({ currency, paymentMethod, status, packageId })

    if (error) {
      throw new BadRequestError(error.errors.map((err) => err.message).join(', '))
    }

    new OK({
      message: 'Payment created successfully',
      metadata: await paymentService.createVnpayPayment({
        user: req.user._id,
        currency: currency,
        ipAddress: req.ip || '127.0.0.1',
        packageId
      })
    }).send(res)
  }

  /**
   * Xử lý callback từ VNPay
   */
  public static async vnpayReturn(req: CustomRequest, res: Response) {
    try {
      const vnpParams = req.query
      const result = await paymentService.processVnpayReturn(vnpParams)

      // Chuyển hướng về trang thành công hoặc thất bại tùy thuộc vào kết quả
      if (result.code === '00') {
        // Thành công - chuyển hướng đến trang thành công
        return res.redirect(`${process.env.FRONTEND_URL}/payment-success`)
      } else {
        // Thất bại - chuyển hướng đến trang thất bại
        return res.redirect(`${process.env.FRONTEND_URL}/payment-failure`)
      }
    } catch (error) {
      console.error('VNPay return error:', error)
      return res.redirect(`${process.env.FRONTEND_URL}/payment-failure`)
    }
  }

  /**
   * IPN (Instant Payment Notification) từ VNPay
   */
  public static async vnpayIpn(req: CustomRequest, res: Response) {
    try {
      const vnpParams = req.query
      const result = await paymentService.processVnpayReturn(vnpParams)

      res.status(200).json({
        RspCode: result.code,
        Message: result.message
      })
    } catch (error) {
      console.error('VNPay IPN error:', error)
      res.status(200).json({
        RspCode: '99',
        Message: 'System error'
      })
    }
  }

  public static async getPaymentOwner(req: CustomRequest, res: Response) {
    const { search = '', page = 1, limit = 10 } = req.query
    const paymentsData = await paymentService.getPaymentOwner(req.user._id, String(search), Number(page), Number(limit))
    new OK({
      message: 'Payment fetched successfully',
      metadata: paymentsData
    }).send(res)
  }

  public static async getAllPaymentsAdmin(req: CustomRequest, res: Response) {
    const { search = '', page = 1, limit = 10 } = req.query
    const paymentsData = await paymentService.getAllPaymentsAdmin(String(search), Number(page), Number(limit))
    new OK({
      message: 'Get all payments successfully',
      metadata: paymentsData
    }).send(res)
  }
}

export default PaymentController
