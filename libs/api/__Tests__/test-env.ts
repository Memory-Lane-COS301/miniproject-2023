import admin from 'firebase-admin';
import { initializeTestApp, clearFirestoreData } from '@firebase/testing';
import { initializeApp } from 'firebase-admin/app';

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const projectId = process.env.NX_FIREBASE_PROJECT_ID;
const databaseName = 'demo-project';
const app = initializeTestApp({ projectId, databaseName });
const db = app.firestore();

beforeEach(async () => {
  await clearFirestoreData({ projectId });
});

export { admin, db };