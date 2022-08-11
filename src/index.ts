import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { dbConnection } from './config/database.config'
import * as router from './routes'

const defaultPORT = 3000
const app = express()
void dbConnection()

/* -------------------------------------------------------------------------- */
/*                                 MIDELWARES                                 */
/* -------------------------------------------------------------------------- */
app.use(cors()) // allow CORS
app.use(express.json()) // Read and Parse Body
/* --------------------------------- ROUTES --------------------------------- */
app.use('/api/users', router.userRouter)
app.use('/api/hospitals', router.hospitalRouter)
app.use('/api/doctors', router.doctorRouter)
app.use('/api/login', router.authRouter)
/* -------------------------------------------------------------------------- */
/*                                 RUN SERVER                                 */
/* -------------------------------------------------------------------------- */
app.listen(process.env.PORT ?? defaultPORT, () => {
  console.log(`Server running on port ${String(process.env.PORT ?? defaultPORT)}...`)
})
