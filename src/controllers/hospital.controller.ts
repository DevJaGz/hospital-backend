import { Response, Request } from 'express'
import { IResponse } from '../interfaces/global.interface'

class HospitalController {
  async get (_req: Request, res: Response): Promise<void> {
    try {
      const response: IResponse = {
        ok: true,
        msg: 'GET works!'
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

  async post (_req: Request, res: Response): Promise<void> {
    try {
      const response: IResponse = {
        ok: true,
        msg: 'POST works!'
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

  async delete (_req: Request, res: Response): Promise<void> {
    try {
      const response: IResponse = {
        ok: true,
        msg: 'DELETE works!'
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

  async put (_req: Request, res: Response): Promise<void> {
    try {
      const response: IResponse = {
        ok: true,
        msg: 'PUT works!'
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
}

export const hospitalController = new HospitalController()
