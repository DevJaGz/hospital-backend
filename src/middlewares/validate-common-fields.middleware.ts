import { Response, Request, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { IResponse } from '../interfaces/user.interface'

export const validateUserFieldsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const response: IResponse = {
      ok: false,
      errors: errors.mapped()
    }
    res.status(400).json(response)
    return
  }
  next()
}
