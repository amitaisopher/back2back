import { Express, NextFunction, Request, Response } from 'express';
import mongooseUsersRouter from '../routes/user.routes';
import mongooseAuthenticationRouter from '../routes/auth.routes';
import typeormProductsRouter from '../controllers/typeorm/product.controller';
import deserializeUser from '../middleware/deserializeUser';

const routerSetup = (app: Express) =>
    app

        .get('/heartbeat', async (req: Request, res: Response) => {
            res.send('Heartbeat from Express back2back')
        })
        .use(deserializeUser)
        .use('/api/auth/', mongooseAuthenticationRouter)
        .use('/api/auth/users', mongooseUsersRouter)
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
