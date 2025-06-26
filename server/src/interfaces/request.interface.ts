import { IKeyTokenDocument } from '@/models/keyToken.model.js'
import { Request } from 'express'

export interface CustomRequest extends Request {
  user?: any
  keyToken?: IKeyTokenDocument
}
