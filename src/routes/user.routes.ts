import express from 'express';
import validateResource from '../middleware/validateResource';
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from '../databases/mongodb/schema/user.schema';
import { createUserHandler, forgotPasswordHandler, getCurrentUserHandler, resetPasswordHandler, verifyUserHandler } from '../controllers/mongoose/user.controller';
import requireUser from '../middleware/requireUser';

const router = express.Router();

router.post('/', validateResource(createUserSchema), createUserHandler)
router.post('/verify/:id/:verificationCode', validateResource(verifyUserSchema), verifyUserHandler)
router.post('/forgotpassword', validateResource(forgotPasswordSchema), forgotPasswordHandler)
router.post('/resetpassword/:id/:passwordResetCode', validateResource(resetPasswordSchema), resetPasswordHandler)
router.get('/me', requireUser, getCurrentUserHandler)

export default router
