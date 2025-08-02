const { connectToDatabase } = require("./utils/mongo");
const { ObjectId } = require("mongodb");

async function getBookingSummaryHandler(event) {
  let client;

  try {
    const { userId } = event.queryStringParameters || {};

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing userId in query" }),
      };
    }

    const dbConn = await connectToDatabase();
    const db = dbConn.db;
    client = dbConn.client;

    const summaries = db.collection("user_id");

    const data = await summaries.findOne({ _id: new ObjectId(userId) });

    if (!data) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No such user exists" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (err) {
    console.error("❌ Error fetching booking summary:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error" }),
    };
  } finally {
    if (client) await client.close();
  }
}

module.exports = getBookingSummaryHandler;
