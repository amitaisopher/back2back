import jwt from 'jsonwebtoken';


export function signJwt(
    object: Object,
    keyTypeName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: jwt.SignOptions | undefined) {
    const signingKey = Buffer.from((keyTypeName === 'accessTokenPrivateKey' ? process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY ?? '' : process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY ?? ''), 'base64').toString('ascii')

    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: 'RS256'
    })
}

export function verifyJwt<T>(
    token: string,
    keyTypeName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null {
    const publicKey = Buffer.from((keyTypeName === 'accessTokenPublicKey' ? process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY ?? '' : process.env.JWT_REFRESH_TOKEN_PUBLIC_KEY ?? ''), 'base64').toString('ascii')
    try {
        const decoded = jwt.verify(token, publicKey) as T
        return decoded
    } catch (error) {
        return null
    }
}
