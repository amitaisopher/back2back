import { Express } from 'express';
import mongooseConnect from '../databases/mongodb/mongodb';
import typeORMConnect from '../databases/postgresql/typeorm';
import log from '../utils/logger';

const appSetup = async (app: Express) => {
    try {
        await Promise.all([
            typeORMConnect(),
            mongooseConnect()
        ])
        log.info('All databases connected successfully')

        const APP_PORT = process.env.EXPRESS_APP_PORT || 3000;

        app.listen(APP_PORT, () => {
            log.info(`🔥 Server started on port ${APP_PORT}`);
        });
    } catch (error) {
        log.error('Unable to start the app!')
        console.error(error)
    }

}

export default appSetup
