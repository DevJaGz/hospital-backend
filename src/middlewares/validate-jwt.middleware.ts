import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { IResponse } from '../interfaces/user.interface'

export const validateJWTMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.header('x-token')
    if (token == null) {
      const response: IResponse = {
        ok: false,
        errors: { token: { msg: 'there is no token in the request', param: 'x-token', location: 'header' } }
      }
      res.status(401).json(response)
      return
    }
    try {
      const secret = process.env.JWT_SECRET ?? ''
      const payload = jwt.verify(token, secret)
      if (payload == null) {
        const response: IResponse = {
          ok: false,
          errors: { token: { msg: 'Could not get payload from token', param: 'x-token', location: 'header' } }
        }
        res.status(401).json(response)
        return
      }
      const reqCopy = req as any
      reqCopy.JWT_payload = payload
      next()
    } catch (error) {
      const response: IResponse = {
        ok: false,
        errors: { token: { msg: error, param: 'x-token', location: 'header' } }
      }
      res.status(401).json(response)
    }
  } catch (error) {
    const response: IResponse = {
      ok: false,
      errors: error
    }
    res.status(500).json(response)
  }
}
