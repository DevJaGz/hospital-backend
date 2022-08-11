import { IHospital } from './hospital.interface'
import { IUser } from './user.interface'

export interface IDoctor {
  id: string
  name: string
  img: string
  user: IUser
  hospital: IHospital
}
