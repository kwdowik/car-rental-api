import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient

let connection, db

 const makeDb = async() => {
  connection = connection ||
    await MongoClient.connect(
      process.env.DB_URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
  db = db || await connection.db(process.env.DB_NAME)
  return db
}

export async function closeDb () {
  await connection.close()
}

export async function clearDb () {
  await db.collection('cars').deleteMany({})
  return true
}

export { connection, db }

export default makeDb;
