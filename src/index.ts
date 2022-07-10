import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { dbConnection } from './config/database.config'
import { userRouter } from './routes/user.routes'

const defaultPORT = 3000
const app = express()
void dbConnection()

/* -------------------------------------------------------------------------- */
/*                                 MIDELWARES                                 */
/* -------------------------------------------------------------------------- */
app.use(cors()) // allow CORS
app.use(express.json()) // Read and Parse Body
/* --------------------------------- ROUTES --------------------------------- */
app.use('/api/users', userRouter)
/* -------------------------------------------------------------------------- */
/*                                 RUN SERVER                                 */
/* -------------------------------------------------------------------------- */
app.listen(process.env.PORT ?? defaultPORT, () => {
  console.log(`Server running on port ${String(process.env.PORT ?? defaultPORT)}...`)
})
