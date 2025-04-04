import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || "aumnify");
  return { db, client };
}
