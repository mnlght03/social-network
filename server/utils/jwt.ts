import jwt from 'jsonwebtoken'

const { jwtSecret } = useRuntimeConfig()

if (!jwtSecret) {
  throw new Error('Jwt secret not found. Make sure NUXT_JWT_SECRET is set in .env.')
}

function generateUserToken(userId: string, expiresIn: string) {
  return jwt.sign({ userId }, jwtSecret, {
    expiresIn,
  })
}

export function generateAccessToken(userId: string) {
  return generateUserToken(userId, '10m')
}

export function generateRefreshToken(userId: string) {
  return generateUserToken(userId, '4h')
}

export function generateJwtPair(userId: string) {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(userId),
  }
}

/** Returns token payload if token is valid, undefined otherwise */
export function verifyToken(token: string) {
  try {
    // Throws error on expired token
    return jwt.verify(token, jwtSecret) as jwt.JwtPayload
  }
  catch {
    return undefined
  }
}
