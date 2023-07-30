import { Schema, model } from 'mongoose';
import { IUser } from '../model/user.model';
import { object, string, TypeOf } from 'zod';

const schema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

export const createUserSchema = object({
    body: object({
        username: string({
            required_error: 'Username is required'
        }),
        email: string({
            required_error: 'Email is required'
        })
            .email('Not a valid email address')
            .min(5, 'Email address is too short'),
        password: string({
            required_error: 'Password is required'
        })
            .min(6, 'Password too short - it must be at least 6 characters long'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required'
        })
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation']
    })
})

export type createUserInput = TypeOf<typeof createUserSchema>['body']

export default model<IUser>('user', schema);
