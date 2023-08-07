import express from 'express';
import validateResource from '../middleware/validateResource';
import { createSessionSchema } from '../databases/mongodb/schema/auth.schema';
import { createSessionHandler, refreshAccessTokenHandler } from '../controllers/mongoose/auth.controller';

const router = express.Router()

router.post('/session', validateResource(createSessionSchema), createSessionHandler)
router.post('/session/refresh', refreshAccessTokenHandler)

export default router
