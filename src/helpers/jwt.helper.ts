import jwt from 'jsonwebtoken'

export const generateJWT = async (uid: string): Promise<string> => {
  return await new Promise<string>((resolve, reject) => {
    const payload = {
      uid
    }
    jwt.sign(payload,
      process.env.JWT_SECRET ?? '@DefaultSecret123@',
      {
        expiresIn: '12h'
      }, (error, token) => {
        if (error != null) {
          console.log(error)
          reject(new Error(`Failed to generate JWT token, more info: \n ${JSON.stringify(error)}`))
        } else {
          resolve(token ?? 'dummy-error-token')
        }
      })
  })
}
