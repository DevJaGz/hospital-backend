import { Schema, model } from 'mongoose'
import { IHospital } from '../interfaces/hospital.interface'

const HospitalSchema = new Schema<IHospital>({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { collection: 'hospitals' })

// Remove __v from each Hospital
HospitalSchema.method('toJSON', function () {
  const { __v: _v, ...Object } = this.toObject()
  return Object
})

export const Hospital = model<IHospital>('Hospital', HospitalSchema)
