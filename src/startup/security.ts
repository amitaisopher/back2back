import { Express } from 'express';
import cors from 'cors';

const securitySetup = (app: Express, express: any) =>
    app
        .use(cors())
        .use(express.json())

export default securitySetup
