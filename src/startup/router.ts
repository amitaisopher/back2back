import { Express, NextFunction, Request, Response } from 'express';
import mongooseUsersRouter from '../controllers/mongoose/user.controller';
import typeormProductsRouter from '../controllers/typeorm/product.controller';

const routerSetup = (app: Express) =>
    app

        .get('/heartbeat', async (req: Request, res: Response) => {
            res.send('Heartbeat from Express back2back')
        })
        .use('/api/mongoose/users', mongooseUsersRouter)
        .use('/api/typeorm/products', typeormProductsRouter)

        // Adding default error handler - if reaching this point then the server will return an error
        .use((error: any, req: Request, res: Response, next: NextFunction) => {
            console.error('\x1b[31m', error);
            if (res.headersSent) {
                return next(error);
            }
            return res.status(error.status || 500).json({
                error: {
                    status: error.status || 500,
                    message: error.status ? error.message : 'Internal Server Error',
                },
            });
        });

export default routerSetup
