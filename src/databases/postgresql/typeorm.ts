import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import log from '../../utils/logger';

let typeORMDB: DataSource;

export default async function typeORMConnect(): Promise<void> {
    const dataSource = new DataSource({
        type: 'postgres',
        url: process.env.PGSQL_URI,
        entities: [
            `${__dirname}/entity/*.entity.js`,
            `${__dirname}/entity/*.entity.ts`
        ], // points to entities
        logging: false,
        synchronize: process.env.NODE_ENV === 'prduction' ? false : true, // Should not be used on Production - instead you should use migration files
    });

    typeORMDB = await dataSource.initialize();
    log.info('Successfully connected to Postgres DB')
}

// Executes TypeORM query for the provided entity model
export function useTypeORM(
    entity: EntityTarget<ObjectLiteral>
): Repository<ObjectLiteral> {
    if (!typeORMDB) {
        throw new Error('TypeORM has not been initialized!');
    }

    return typeORMDB.getRepository(entity);
}
