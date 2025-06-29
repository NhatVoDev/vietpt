import mongoose, { Schema, Document } from 'mongoose';

export interface ITransactionLog extends Document {
  paymentId: mongoose.Types.ObjectId;
  orderCode: string;
  direction: 'OUTGOING' | 'INCOMING';
  url: string;
  requestPayload: string; // Nội dung request (dưới dạng JSON string)
  responsePayload: string; // Nội dung response (dưới dạng JSON string)
  statusCode?: number; // HTTP status code của response
  error?: string; // Lưu lại lỗi nếu có
}

const transactionLogSchema: Schema = new Schema(
  {
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },
    orderCode: {
      type: String,
      required: true,
      index: true, // Đánh index để tìm kiếm nhanh hơn
    },
    direction: {
      type: String,
      enum: ['OUTGOING', 'INCOMING'],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    requestPayload: {
      type: String, // Lưu dưới dạng JSON.stringify
      required: true,
    },
    responsePayload: {
      type: String, // Lưu dưới dạng JSON.stringify
    },
    statusCode: {
      type: Number,
    },
    error: {
      type: String,
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt, updatedAt
  }
);

export default mongoose.model<ITransactionLog>('TransactionLog', transactionLogSchema);