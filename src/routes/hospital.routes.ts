/**
 * Path: /api/hospitals
 */

import { Router } from 'express'
import { hospitalController } from '../controllers'
import { validateJWTMiddleware } from '../middlewares'
export const hospitalRouter = Router()

hospitalRouter.get('/', [
  validateJWTMiddleware
],
hospitalController.get)

hospitalRouter.post('/', [
  validateJWTMiddleware
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
