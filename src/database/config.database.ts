import mongoose from 'mongoose'

export const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_CNN ?? '')
    console.log('Database Online')
  } catch (error) {
    throw new Error(`Can not connect to Database:\n${JSON.stringify(error, null, 2)}`)
  }
}
