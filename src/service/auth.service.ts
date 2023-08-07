import { DocumentType } from '@typegoose/typegoose';
import { User, privateFields } from '../databases/mongodb/model/user.model';
import { signJwt } from '../utils/jwt';
import SessionModel from '../databases/mongodb/model/session.model';
import { omit } from 'lodash';

export function signAccessToken(user: DocumentType<User>) {
    const payload = omit(user.toJSON(), privateFields)
    const accessToken = signJwt(payload, 'accessTokenPrivateKey',
        {
            expiresIn: process.env.JWT_ACCESS_TOKEN_LIFE_EXPECTANCY
        }
    )
    return accessToken
}
export async function signRefreshToken({ userId }: { userId: string }) {
    const session = await createSession({ userId })
    const refreshToken = signJwt({
        session: session.id
    }, 'refreshTokenPrivateKey', {
        expiresIn: process.env.JWT_REFRESH_TOKEN_LIFE_EXPECTANCY
    })
    return refreshToken
}

export async function createSession({ userId }: { userId: string }) {
    return SessionModel.create({ user: userId })
}

export async function findSessionById(id: string) {
    return SessionModel.findById(id)
}
