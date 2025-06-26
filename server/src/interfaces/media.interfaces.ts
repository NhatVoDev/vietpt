export interface IMedia {
  public_id: string
  url: string
  secure_url: string
  resource_type: 'image' | 'video' | 'raw'
  format?: string
  folder?: string
  width?: number
  height?: number
  duration?: number
}
