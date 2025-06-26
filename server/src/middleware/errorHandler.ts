import { ErrorResponse, NotFoundError } from '@/core/error.response.js'
import { Request, Response, NextFunction } from 'express'

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError())
}

export const globalErrorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  console.log(err?.message)
  res.status(err?.status || 500).json({
    message: err?.message || 'Internal Server Error'
  })
}
