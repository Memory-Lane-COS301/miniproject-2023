import * as admin from 'firebase-admin';
import { Seed } from '@mp/api/core/seed';

admin.initializeApp();
admin.firestore().settings({ ignoreUndefinedProperties: true });
const seed = new Seed();
seed.run();

export * from './functions';
