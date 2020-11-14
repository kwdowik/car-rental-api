import makeCarsDb from './cars-db'
import mongodb from 'mongodb'
import seedDb from './seeder'

const MongoClient = mongodb.MongoClient;
const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

export async function makeDb () {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
}

async function clearDb (db) {
  await db.collection('cars').deleteMany({});
  return true;
}

const carsDb = makeCarsDb({ makeDb });

if (process.env.ENVIRONMENT === 'development' || process.env.ENVIRONMENT === 'staging') {
  (async function () {
    seedDb({ carsDb, amount: 5 });
  })()
}

export { carsDb }
