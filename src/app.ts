import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

import appSetup from './startup/init';
import routerSetup from './startup/router';
import securitySetup from './startup/security';

// database connections

appSetup(app)
securitySetup(app, express)
routerSetup(app)

// end
