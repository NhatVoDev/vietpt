export interface IResponse {
  message?: string
  statusCode?: number
  reasonStatusCode?: string
  metadata?: object | null
  options?: object
}
