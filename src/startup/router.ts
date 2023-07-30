import { Express, Request, Response } from 'express';
import mongooseUsersRouter from '../controllers/mongoose/user.controller';
import typeormProductsRouter from '../controllers/typeorm/product.controller';

const routerSetup = (app: Express) =>
    app

        .get('/heartbeat', async (req: Request, res: Response) => {
            res.send('Heartbeat from Express back2back')
        })
        .use('/api/mongoose/users', mongooseUsersRouter)
        .use('/api/typeorm/products', typeormProductsRouter)

export default routerSetup
