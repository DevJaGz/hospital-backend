export interface IUser {
  name: string
  email?: string
  password?: string
  image: string
  role?: string
  google?: boolean
}

export interface IResponse {
  ok: boolean
  errors?: unknown
  [key: string]: any
}
