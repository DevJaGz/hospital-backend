import { Schema, model } from 'mongoose'
import { IUser } from '../interfaces/user.interface'

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE'
  },
  google: {
    type: Boolean,
    default: false
  }

})

// Remove __v and _id from each user and add/set uid with _id
UserSchema.method('toJSON', function () {
  const { __v: _v, _id, password, ...Object } = this.toObject()
  Object.uid = _id
  return Object
})

export const User = model<IUser>('User', UserSchema)
