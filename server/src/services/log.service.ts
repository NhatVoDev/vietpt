import TransactionLogModel, { ITransactionLog } from '@/models/transactionLog.model.js';
import mongoose from 'mongoose';

interface CreateLogInput {
    paymentId: any;
    orderCode: string;
    direction: 'OUTGOING' | 'INCOMING';
    url: string;
    requestPayload: object;
    responsePayload?: object;
    statusCode?: number;
    error?: unknown;
  }
  
  class LogService {
    /**
     * Tạo một bản ghi log cho giao dịch thanh toán.
     * Hàm này được thiết kế để không ném lỗi ra ngoài, tránh làm gián đoạn luồng chính.
     * @param {CreateLogInput} logData - Dữ liệu cần ghi log.
     * @returns {Promise<ITransactionLog | null>} - Trả về bản ghi log đã tạo hoặc null nếu có lỗi.
     */
    public static async createTransactionLog(logData: CreateLogInput): Promise<ITransactionLog | null> {
      try {
        const {
          paymentId,
          orderCode,
          direction,
          url,
          requestPayload,
          responsePayload,
          statusCode,
          error,
        } = logData;
  
        let errorMessage: string | undefined;
        if (error) {
          if (error instanceof Error) {
            errorMessage = JSON.stringify({
              name: error.name,
              message: error.message,
              stack: error.stack,
            });
          } else if (typeof error === 'string') {
            errorMessage = error;
          } else {
            try {
              errorMessage = JSON.stringify(error);
            } catch {
              errorMessage = 'An un-serializable error occurred.';
            }
          }
        }
  
        const newLog = new TransactionLogModel({
          paymentId,
          orderCode,
          direction,
          url,
          requestPayload: JSON.stringify(requestPayload, null, 2),
          responsePayload: responsePayload ? JSON.stringify(responsePayload, null, 2) : undefined,
          statusCode,
          error: errorMessage,
        });
  
        await newLog.save();
        return newLog;
  
      } catch (saveError) {
        console.error('CRITICAL: Failed to save transaction log to the database.', saveError);
        return null;
      }
    }
  }
  
  export default LogService;