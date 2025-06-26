import { IResponse } from '@/interfaces/response.interfaces.js'
import { Response } from 'express'

const StatusCode = {
  OK: 200,
  CREATED: 201
}

const ReasonStatusCode = {
  OK: 'Success',
  CREATED: 'Created'
}

class SuccessResponse {
  public message: string
  public status: number
  public reasonStatusCode: string
  public metadata: object | null
  public options: object

  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {},
    options = {}
  }: IResponse) {
    this.message = message || reasonStatusCode
    this.status = statusCode
    this.reasonStatusCode = reasonStatusCode
    this.metadata = metadata
    this.options = options
  }

  send(res: Response, headers = {}) {
    return res.status(this.status).json({
      message: this.message,
      metadata: this.metadata,
      ...this.options
    })
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata, options }: IResponse) {
    super({ message, metadata, options })
  }
}

class CREATED extends SuccessResponse {
  constructor({ message, metadata, options }: IResponse) {
    super({ options, message, statusCode: StatusCode.CREATED, reasonStatusCode: ReasonStatusCode.CREATED, metadata })
  }
}

export { OK, CREATED }
