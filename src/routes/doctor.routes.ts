/**
 * Path: /api/doctors
 */

import { Router } from 'express'
import { doctorController } from '../controllers'
import { validateJWTMiddleware } from '../middlewares'
export const doctorRouter = Router()

doctorRouter.get('/', [
  validateJWTMiddleware
],
doctorController.get)

doctorRouter.post('/', [
  validateJWTMiddleware
],
doctorController.post)

doctorRouter.delete('/:id', [
  validateJWTMiddleware
],
doctorController.delete)

doctorRouter.put('/:id', [
  validateJWTMiddleware
],
doctorController.put)
