import { Schema, model } from 'mongoose'
import { IDoctor } from '../interfaces/doctor.interface'

const DoctorSchema = new Schema<IDoctor>({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  //   Can be an array in case there are more than one hospital asigned
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  }
}, { collection: 'doctors' })

// Remove __v from each Doctor
DoctorSchema.method('toJSON', function () {
  const { __v: _v, ...Object } = this.toObject()
  return Object
})

export const Doctor = model<IDoctor>('Doctor', DoctorSchema)
