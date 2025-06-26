import nodemailer, { Transporter, SendMailOptions } from 'nodemailer'
import 'dotenv/config'

// Tạo transporter với cấu hình từ biến môi trường
let transporter: Transporter | null = null

/**
 * Khởi tạo transporter cho email service
 */
const initTransporter = () => {
  // Sử dụng cấu hình từ file .env
  const emailConfig = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // chỉ false nếu port là 587 (TLS), true nếu 465 (SSL)
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  } as nodemailer.TransportOptions

  // Tạo transporter với cấu hình
  transporter = nodemailer.createTransport(emailConfig)

  // Xác minh kết nối
  transporter.verify((error) => {
    if (error) {
      console.error('Email service error:', error)
    } else {
      console.log('Email service is ready to send messages')
    }
  })
}

/**
 * Gửi email
 * @param {Object} options - Các tùy chọn email
 * @param {String} options.to - Người nhận (có thể là nhiều người, ngăn cách bằng dấu phẩy)
 * @param {String} options.subject - Tiêu đề email
 * @param {String} options.text - Nội dung dạng text
 * @param {String} options.html - Nội dung dạng HTML
 * @param {String} options.from - Người gửi (nếu không cung cấp, sẽ sử dụng giá trị mặc định)
 * @param {String} options.cc - CC (người nhận carbon copy)
 * @param {String} options.bcc - BCC (người nhận blind carbon copy)
 * @param {Array} options.attachments - Danh sách tệp đính kèm
 * @returns {Promise} - Promise chứa kết quả gửi email
 */
const sendEmail = async (options: SendMailOptions): Promise<any> => {
  // Khởi tạo transporter nếu chưa được khởi tạo
  if (!transporter) {
    initTransporter()
  }

  // Cấu hình mặc định cho email
  const defaultFrom = `${process.env.EMAIL_FROM_NAME || 'AI Prompt'} <${process.env.EMAIL_USERNAME}>`

  // Cấu hình email để gửi
  const mailOptions: SendMailOptions = {
    from: options.from || defaultFrom,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
    cc: options.cc,
    bcc: options.bcc,
    attachments: options.attachments
  }

  try {
    // Gửi email và trả về kết quả
    const info = await transporter!.sendMail(mailOptions)
    return info
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

/**
 * Gửi email khôi phục mật khẩu
 * @param {String} to - Email người nhận
 * @param {String} code - Mã code khôi phục mật khẩu
 * @returns {Promise} - Promise chứa kết quả gửi email
 */
const sendPasswordResetEmail = async (to: string, resetCode: string) => {
  const subject = 'Đặt lại mật khẩu của bạn'

  // Nội dung text
  const text = `  
    Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình. Vui lòng nhấp vào liên kết dưới đây để đặt lại mật khẩu:  
    
    ${resetCode}  
    
    Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.  
    
    Trân trọng
  `

  // Nội dung HTML
  const html = `  
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9e9e9; border-radius: 5px;">  
      <h2 style="color: #333; text-align: center;">Đặt lại mật khẩu</h2>  
      <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình. Vui lòng nhấp vào nút dưới đây để đặt lại mật khẩu:</p>  
      <div style="text-align: center; margin: 30px 0;">  
        <p style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">${resetCode}</p>  
      </div>  
      <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>  
      <p>Trân trọng</p>  
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9e9e9; font-size: 12px; color: #777; text-align: center;">  
        Email này được gửi tự động, vui lòng không trả lời.  
      </div>  
    </div>  
  `

  return sendEmail({
    to,
    subject,
    text,
    html
  })
}

export { initTransporter, sendEmail, sendPasswordResetEmail }
