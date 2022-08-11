/**
 * Path: /api/hospitals
 */

import { Router } from 'express'
import { check } from 'express-validator'
import { hospitalController } from '../controllers'
import { validateJWTMiddleware, validateUserFieldsMiddleware } from '../middlewares'
export const hospitalRouter = Router()

hospitalRouter.get('/', [
  validateJWTMiddleware
],
hospitalController.get)

hospitalRouter.post('/', [
  validateJWTMiddleware,
  check('name', 'name is required').not().isEmpty(),
  validateUserFieldsMiddleware
],
hospitalController.post)

hospitalRouter.delete('/:id', [
  validateJWTMiddleware
],
hospitalController.delete)

hospitalRouter.put('/:id', [
  validateJWTMiddleware
],
hospitalController.put)
