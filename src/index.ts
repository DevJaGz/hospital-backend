import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { dbConnection } from './database/config.database'

const defaultPORT = 3000
const app = express()
void dbConnection()

/* -------------------------------------------------------------------------- */
/*                                 MIDELWARES                                 */
/* -------------------------------------------------------------------------- */
app.use(cors())
app.use(express.json())

app.get('', (_res, req) => {
  const response = {
    ok: true,
    body: 'works!'
  }
  req.send(response)
})

app.listen(process.env.PORT ?? defaultPORT, () => {
  console.log(`Server running on port ${String(process.env.PORT ?? defaultPORT)}...`)
})
