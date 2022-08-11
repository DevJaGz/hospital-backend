import { Types } from 'mongoose'
export interface IHospital {
  id: string
  name: string
  img: string
  user_id: Types.ObjectId
}
