import { Request, Response } from 'express'
import { IUser } from '../interfaces/user.interface'
import { User } from '../models/user.model'
import bcrypt from 'bcrypt'
import { generateJWT } from '../helpers'
import { IResponse } from '../interfaces/global.interface'

export const get = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}, 'name email role google')
    const reqCopy = req as any
    const uid = reqCopy.JWT_payload.uid
    const response: IResponse = {
      ok: true,
      users,
      uid
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

export const put = async (req: Request, res: Response): Promise<void> => {
  try {
    const uid = req.params.id
    const userDB = await User.findById(uid)
    if (userDB == null) {
      const response: IResponse = {
        ok: false,
        errors: { user: { msg: 'user does not exist' } }
      }
      res.status(400).json(response)
      return
    }
    const { password, google, role, ...body } = req.body as IUser
    if (userDB.email !== body.email) {
      const emailAlreadyExist = await User.findOne({ email: body.email })
      if (emailAlreadyExist != null) {
        const response: IResponse = {
          ok: false,
          errors: { email: { msg: 'Email already exists', param: 'email', location: 'body' } }
        }
        res.status(400).json(response)
        return
      }
    }
    const userUpdated = await User.findByIdAndUpdate(uid, body, { new: true }) // if new is false (by default) userUpdated would have the last values in the DB
    const response: IResponse = {
      ok: true,
      user: userUpdated
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

export const del = async (req: Request, res: Response): Promise<void> => {
  try {
    const uid = req.params.id
    const userDB = await User.findById(uid)
    if (userDB == null) {
      const response: IResponse = {
        ok: false,
        errors: { user: { msg: 'user does not exist' } }
      }
      res.status(400).json(response)
      return
    }
    const userDeleted = await User.findByIdAndDelete(uid)
    const response: IResponse = {
      ok: true,
      user: userDeleted
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

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as IUser
    const emailAlreadyExist = await User.findOne({ email })
    if (emailAlreadyExist != null) {
      const response: IResponse = {
        ok: false,
        errors: { email: { msg: 'Email already exists', param: 'email', location: 'body' } }
      }
      res.status(400).json(response)
      return
    }
    const user = new User(req.body)
    if (password != null) {
      const salt = bcrypt.genSaltSync()
      user.password = bcrypt.hashSync(password, salt)
    }
    await user.save()
    const token = await generateJWT(user.id)
    const response: IResponse = {
      ok: true,
      user,
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
