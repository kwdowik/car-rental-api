import Id from '../entities/id'

const COLLECTION_NAME = 'cars';

const makeCarsDb = ({ makeDb }) => {
  return Object.freeze({
    findAll,
    findById,
    insert,
    remove,
    update
  })
  async function findAll () {
    const db = await makeDb();
    const query = {};
    const result = await db.collection(COLLECTION_NAME).find(query);
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }
  async function findById ({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection(COLLECTION_NAME).find({ _id });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }
  async function insert ({ id: _id = Id.makeId(), ...carInfo }) {
    const db = await makeDb();
    const result = await db
      .collection(COLLECTION_NAME)
      .insertOne({ _id, ...carInfo });
    const { _id: id, ...insertedInfo } = result.ops[0];
    return { id, ...insertedInfo };
  }

  async function update ({ id: _id, ...carInfo }) {
    const db = await makeDb();
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne({ _id }, { $set: { ...carInfo } });
    return result.modifiedCount > 0 ? { id: _id, ...carInfo } : null;
  }
  async function remove ({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection(COLLECTION_NAME).deleteOne({ _id });
    return result.deletedCount;
  }
}

export default makeCarsDb;
