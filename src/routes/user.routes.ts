/**
 * Path: /api/users
 */

import { Router } from 'express'
import * as userController from '../controllers/user.controller'

export const userRouter = Router()

userRouter.get('/', userController.get)
userRouter.post('/', userController.create)
