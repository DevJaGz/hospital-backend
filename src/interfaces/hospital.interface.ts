import { IUser } from './user.interface'

export interface IHospital{
  id: string
  name: string
  img: string
  user: IUser
}
