// mongo.js
const { MongoClient } = require("mongodb");

let cachedClient = null;
let cachedDb = null;

const uri = "<put it here>";
const dbName = "carrent_db";

async function connectToDatabase() {
  if (cachedDb && cachedClient) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri); // No deprecated options

  try {
    await client.connect();
    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;



    const collections = await db.listCollections().toArray();
    console.log(collections)

    console.log("✅ MongoDB connected successfully.");

    return { client, db };
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
}

connectToDatabase()

module.exports = { connectToDatabase };
