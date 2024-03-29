import { Response, Request } from 'express'
import { IResponse } from '../interfaces/global.interface'
import { IHospital } from '../interfaces/hospital.interface'
import { Hospital } from '../models/hospital.model'

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

  async post (req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body as IHospital
      const nameAlreadyExist = await Hospital.findOne({ name })
      if (nameAlreadyExist != null) {
        const response: IResponse = {
          ok: false,
          errors: { name: { msg: 'Name already exists', param: 'name', location: 'body' } }
        }
        res.status(400).json(response)
        return
      }
      const reqCopy = req as any
      const uid = reqCopy.JWT_payload.uid
      const hospital = new Hospital({
        ...req.body,
        user_id: uid
      })
      const hospitalDB = await hospital.save()
      const response: IResponse = {
        ok: true,
        hospital: hospitalDB
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
