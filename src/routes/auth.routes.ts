/**
 * Path: /api/login
 */

import { Router } from 'express'
import { check } from 'express-validator'
import * as authControler from '../controllers/auth.controller'
import { validateUserFieldsMiddleware } from '../middlewares'
export const authRouter = Router()

authRouter.post('/', [
  check('password', 'password is required').not().isEmpty(),
  check('email', 'email is required').isEmail(),
  validateUserFieldsMiddleware
],
authControler.post)
