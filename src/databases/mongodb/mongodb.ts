import { connect } from 'mongoose';
import log from '../../utils/logger';

export default async function mongooseConnect(): Promise<void> {
    const mongoDBURI = process.env.MONGO_URI ?? 'mongodb://localhost:27017';
    await connect(mongoDBURI);
    log.info('Successfully connected to MongoDB')
}
