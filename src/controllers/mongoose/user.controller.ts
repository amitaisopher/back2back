import { Request, Response } from 'express';
import {
    CreateUserInput,
    ForgotPasswordInput,
    ResetPasswordInput,
    VerifyUserInput,
} from '../../databases/mongodb/schema/user.schema';
import { createUser, findUserByEmail, findUserById } from '../../service/user.service';
import sendEmail from '../../utils/mailer';
import log from '../../utils/logger'
import { nanoid } from 'nanoid';


export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput>,
    res: Response
) {
    const body = req.body;
    try {
        const user = await createUser(body);
        await sendEmail({
            from: 'test@example.com',
            to: user.email,
            subject: 'Please verify your account',
            text: `Verification code: ${user.verificationCode}. ID: ${user.id}`,
        });
        return res.send('User successfully created');
    } catch (e: any) {
        if (e.code === 11000) {
            return res.status(409).send('Account already exist');
        }
        return res.status(500).send(e);
    }
}

export async function verifyUserHandler(
    req: Request<VerifyUserInput>, res: Response) {
    const id = req.params.id
    const verificationCode = req.params.verificationCode

    // find the user by ID
    const user = await findUserById(id)

    if (!user) {
        return res.send('Could not verify User')
    }

    // check to see if they ar already verified
    if (user.verified) {
        return res.send('User is already verified')
    }

    // check to see if thee verify codee matches
    if (user.verificationCode === verificationCode) {
        user.verified = true
        await user.save()
        return res.send('user successfully verified')
    }
    return res.send('Could no verify user')



}

export async function forgotPasswordHandler(
    req: Request<{}, {}, ForgotPasswordInput>, res: Response) {
    const { email } = req.body
    const message = 'If a user with that email is registered then you will receive a password reset email'
    const user = await findUserByEmail(email)
    if (!user) {
        log.debug(`User with email ${email} does not exist`)
        res.send(message)
    }
    if (!user?.verified) {
        return res.send('User is not verified')
    }
    const passwordResetCode = nanoid()
    user.passwordResetCode = passwordResetCode
    await user.save()
    await sendEmail({
        to: user.email,
        from: 'example@test.com',
        subject: 'Reset your password',
        text: `Password reset code: ${passwordResetCode}, Id: ${user._id}`
    })
    log.debug(`Password reset email was sent to ${email}`)
    return res.send(message)
}

export async function resetPasswordHandler(
    req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>, res: Response) {
    const { id, passwordResetCode } = req.params
    const { password } = req.body
    const user = await findUserById(id)
    if (!user?.passwordResetCode
        || user.passwordResetCode !== passwordResetCode) {
        return res.status(400).send('Could not reset user password')
    }
    user.passwordResetCode = null
    user.password = password

    await user.save()
    res.send('Successfully updated the password')
}

export async function getCurrentUserHandler(req: Request, res: Response) {
    return res.send(res.locals.user)
}
