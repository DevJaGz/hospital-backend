import { Response, Request } from 'express'
import { IUser } from '../interfaces/user.interface'
import { User } from '../models/user.model'
import bcrypt from 'bcrypt'
import { generateJWT } from '../helpers'
import { IResponse } from '../interfaces/global.interface'

export const post = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, 'email' | 'password'>
    const { email, password } = body
    const userDB = await User.findOne({ email })
    if (userDB == null) {
      const response: IResponse = {
        ok: false,
        errors: { email: { msg: 'email not found', param: 'email', location: 'body' } }
      }
      res.status(400).json(response)
      return
    }
    if (password != null) {
      const validPassword = await bcrypt.compare(password, userDB.password ?? '')
      if (!validPassword) {
        const response: IResponse = {
          ok: false,
          errors: { password: { msg: 'password not found', param: 'password', location: 'body' } }
        }
        res.status(400).json(response)
        return
      }
    }

    const token = await generateJWT(userDB.id)
    const response: IResponse = {
      ok: true,
      user: userDB,
      token
    }
    res.json(response)
  } catch (error) {
    const response: IResponse = {
      ok: false,
      errors: error
    }
    res.status(500).json(response)
  }
}
