/**
 * Path: /api/users
 */

import { Router } from 'express'
import * as userController from '../controllers/user.controller'
import { check } from 'express-validator'
import { validateUserFieldsMiddleware, validateJWTMiddleware } from '../middlewares'

export const userRouter = Router()

userRouter.get('/', validateJWTMiddleware, userController.get)
userRouter.post('/',
  [
    validateJWTMiddleware,
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateUserFieldsMiddleware
  ],
  userController.create)
userRouter.put('/:id',
  [
    validateJWTMiddleware,
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('role', 'role is required').not().isEmpty(),
    validateUserFieldsMiddleware
  ],
  userController.put)
userRouter.delete('/:id',
  [
    validateJWTMiddleware,
    validateUserFieldsMiddleware
  ],
  userController.del)
