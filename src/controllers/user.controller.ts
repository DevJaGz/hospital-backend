import { Request, Response } from 'express'
// import { IUser } from '../interfaces/user.interface'
import { User } from '../models/user.model'

export const get = async (_req: Request, res: Response): Promise<void> => {
  const users = await User.find({}, 'name email role google')
  try {
    const response = {
      ok: true,
      users
    }
    res.send(response)
  } catch (error) {
    const response = {
      ok: false,
      error
    }
    res.status(400).send(response)
  }
}

export const create = async (req: Request, res: Response): Promise<void> => {
  // const { name, email, password, google, image, role } = req.body as IUser
  const user = new User(req.body)
  try {
    await user.save()
    const response = {
      ok: true,
      user
    }
    res.send(response)
  } catch (error) {
    const response = {
      ok: false,
      user,
      error
    }
    res.status(400).send(response)
  }
}
