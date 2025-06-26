import crypto from 'node:crypto'
import moment from 'moment'
import qs from 'qs'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'
import { HashAlgorithm, VNPay } from 'vnpay'
import PaymentModel from '@/models/payment.model.js'
import mongoose from 'mongoose'
dotenv.config()

interface VnpayPaymentData {
  user: string
  currency: string
  ipAddress: string
  packageId: string
}

interface VnpParams {
  [key: string]: any
}

class PaymentService {
  private vnp_TmnCode: string
  private vnp_HashSecret: string
  private vnp_Url: string
  private vnp_ReturnUrl: string
  private vnp_ApiUrl: string
  private vnpay: any

  constructor() {
    this.vnp_TmnCode = process.env.VNP_TMN_CODE || ''
    this.vnp_HashSecret = process.env.VNP_HASH_SECRET || ''
    this.vnp_Url = process.env.VNP_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
    this.vnp_ReturnUrl = process.env.VNP_RETURN_URL || 'http://localhost:3000/api/payment/vnpay-return'
    this.vnp_ApiUrl = process.env.VNP_API_URL || 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction'
    this.vnpay = new VNPay({
      tmnCode: this.vnp_TmnCode,
      secureSecret: this.vnp_HashSecret,
      testMode: true,
      hashAlgorithm: HashAlgorithm.SHA512,
      enableLog: true
    })
  }

  async getPaymentOwner(userId: string, search = '', page = 1, limit = 10) {
    const query: any = { user: mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId }
    if (search) {
      query.$or = [{ transactionCode: { $regex: search, $options: 'i' } }]
    }
    const skip = (page - 1) * limit
    const aggregate: any[] = [
      { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $lookup: { from: 'packages', localField: 'package', foreignField: '_id', as: 'package' } },
      { $unwind: '$package' },
      { $match: { 'user._id': mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId } }
    ]
    if (search) {
      aggregate.push({
        $match: {
          $or: [
            { transactionCode: { $regex: search, $options: 'i' } },
            { 'package.name': { $regex: search, $options: 'i' } }
          ]
        }
      })
    }
    const facet = [...aggregate, { $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }]
    const countFacet = [...aggregate, { $count: 'total' }]
    const [payments, countArr] = await Promise.all([PaymentModel.aggregate(facet), PaymentModel.aggregate(countFacet)])
    const total = countArr[0]?.total || 0
    const totalPages = Math.ceil(total / limit)
    return {
      payments,
      pagination: {
        total,
        totalPages,
        page,
        limit
      }
    }
  }

  /**
   * Tạo một giao dịch thanh toán VNPay
   * @param {VnpayPaymentData} data - Dữ liệu thanh toán
   * @returns {Promise<{paymentUrl: string, transactionCode: string}>}
   */
  async createVnpayPayment(data: VnpayPaymentData): Promise<{ paymentUrl: string; transactionCode: string }> {
    try {
      if (!this.vnp_HashSecret || !this.vnp_TmnCode || !this.vnp_Url || !this.vnp_ReturnUrl) {
        throw new Error('Missing VNPay configuration')
      }
      const { user, currency, ipAddress, packageId } = data

      const transactionCode = `VNP${moment().format('YYYYMMDDHHmmss')}${uuidv4().substring(0, 8)}`
      const payment = new PaymentModel({
        user: user,
        paymentMethod: 'cash',
        currency: currency,
        status: 'pending',
        transactionCode: transactionCode,
        package: packageId
      })
      await payment.save()
      const vnp_Params: VnpParams = {
        vnp_TxnRef: transactionCode,
        vnp_OrderInfo: `Thanh toan hoa don`,
        vnp_OrderType: 'billpayment',
        vnp_Amount: currency,
        vnp_IpAddr: ipAddress,
        vnp_ReturnUrl: this.vnp_ReturnUrl,
        vnp_Locale: 'vn',
        vnp_CreateDate: moment().format('YYYYMMDDHHmmss'),
        vnp_CurrCode: 'VND'
      }
      const paymentUrl = this.vnpay.buildPaymentUrl(vnp_Params)
      return {
        paymentUrl,
        transactionCode
      }
    } catch (error) {
      console.error('Create VNPay payment error:', error)
      throw error
    }
  }

  /**
   * Xử lý callback từ VNPay
   * @param {VnpParams} vnpParams - Tham số trả về từ VNPay
   * @returns {Promise<Object>} - Kết quả xử lý
   */
  async processVnpayReturn(vnpParams: VnpParams): Promise<any> {
    try {
      const verify = this.vnpay.verifyReturnUrl(vnpParams)
      if (!verify.isVerified) {
        return {
          code: verify.code,
          message: 'Xác thực tính toàn vẹn dữ liệu thất bại'
        }
      }
      if (!verify.isSuccess) {
        return {
          code: '02',
          message: 'Đơn hàng thanh toán thất bại'
        }
      }
      const payment = await PaymentModel.findOne({
        transactionCode: vnpParams.vnp_TxnRef
      })
      if (!payment) {
        return {
          code: '01',
          message: 'Transaction not found'
        }
      }
      if (payment.status === 'success') {
        return {
          code: '00',
          message: 'Transaction already processed',
          paymentId: payment._id
        }
      }
      payment.status = 'success'
      payment.paidAt = new Date()
      await payment.save()
      return {
        code: '00',
        message: 'Transaction successful',
        paymentId: payment._id
      }
    } catch (error) {
      console.error('Process VNPay return error:', error)
      return {
        code: '99',
        message: 'System error'
      }
    }
  }

  /**
   * Kiểm tra trạng thái giao dịch thông qua API VNPay
   * @param {string} transactionCode - Mã giao dịch
   * @returns {Promise<Object>} - Kết quả
   */
  async checkVnpayTransaction(transactionCode: string): Promise<any> {
    try {
      const vnp_RequestData: VnpParams = {
        vnp_Version: '2.1.0',
        vnp_Command: 'querydr',
        vnp_TmnCode: this.vnp_TmnCode,
        vnp_TxnRef: transactionCode,
        vnp_OrderInfo: `Kiem tra giao dich ${transactionCode}`,
        vnp_TransactionDate: moment().format('YYYYMMDDHHmmss'),
        vnp_CreateDate: moment().format('YYYYMMDDHHmmss'),
        vnp_IpAddr: '127.0.0.1'
      }
      const sortedParams = this.sortObject(vnp_RequestData)
      const signData = qs.stringify(sortedParams, { encode: false })
      const hmac = crypto.createHmac('sha512', this.vnp_HashSecret)
      const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')
      sortedParams.vnp_SecureHash = signed
      const response = await axios.post(this.vnp_ApiUrl, qs.stringify(sortedParams))
      const payment = await PaymentModel.findOne({
        transactionCode: transactionCode
      })
      if (!payment) {
        return {
          code: '01',
          message: 'Transaction not found'
        }
      }
      if (response.data.vnp_ResponseCode === '00') {
        payment.status = 'success'
        payment.paidAt = new Date()
        await payment.save()
      } else if (payment.status !== 'success') {
        payment.status = 'failed'
        await payment.save()
      }
      return {
        code: response.data.vnp_ResponseCode,
        message: response.data.vnp_Message,
        paymentId: payment._id
      }
    } catch (error) {
      console.error('Check VNPay transaction error:', error)
      return {
        code: '99',
        message: 'System error'
      }
    }
  }

  /**
   * Sắp xếp object theo key
   * @param {VnpParams} obj - Object cần sắp xếp
   * @returns {VnpParams} - Object đã sắp xếp
   */
  sortObject(obj: VnpParams): VnpParams {
    const sorted: VnpParams = {}
    const keys = Object.keys(obj).sort()
    for (const key of keys) {
      if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
        sorted[key] = obj[key]
      }
    }
    return sorted
  }

  async getAllPaymentsAdmin(search = '', page = 1, limit = 10) {
    const query: any = {}
    if (search) {
      query.$or = [{ transactionCode: { $regex: search, $options: 'i' } }]
    }
    // Lấy danh sách payment, populate user và package để có thể search nâng cao
    const skip = (page - 1) * limit
    // Nếu cần search theo tên user/package, phải lấy hết rồi filter, hoặc dùng aggregate
    // Ở đây sẽ dùng aggregate để search nâng cao
    const aggregate: any[] = [
      { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $lookup: { from: 'packages', localField: 'package', foreignField: '_id', as: 'package' } },
      { $unwind: '$package' },
      { $match: query }
    ]
    if (search) {
      aggregate.push({
        $match: {
          $or: [
            { transactionCode: { $regex: search, $options: 'i' } },
            { 'user.firstName': { $regex: search, $options: 'i' } },
            { 'user.lastName': { $regex: search, $options: 'i' } },
            { 'user.email': { $regex: search, $options: 'i' } },
            { 'package.name': { $regex: search, $options: 'i' } }
          ]
        }
      })
    }
    const facet = [...aggregate, { $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }]
    const countFacet = [...aggregate, { $count: 'total' }]
    const [payments, countArr] = await Promise.all([PaymentModel.aggregate(facet), PaymentModel.aggregate(countFacet)])
    const total = countArr[0]?.total || 0
    const totalPages = Math.ceil(total / limit)
    return {
      payments,
      pagination: {
        total,
        totalPages,
        page,
        limit
      }
    }
  }
}

export default new PaymentService()
