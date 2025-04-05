import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

export async function connectToMemory() {
  if (!db) {
    await client.connect();
    db = client.db();
  }
  return db.collection('memory');
}

export async function remember(tag, content) {
  const memory = await connectToMemory();
  await memory.updateOne(
    { tag },
    { $set: { tag, content, updatedAt: new Date() } },
    { upsert: true }
  );
}

export async function recall(tag) {
  const memory = await connectToMemory();
  const result = await memory.findOne({ tag });
  return result ? result.content : null;
}

export async function clear(tag) {
  const memory = await connectToMemory();
  await memory.deleteOne({ tag });
}
