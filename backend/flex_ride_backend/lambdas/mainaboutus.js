const { connectToDatabase } = require("./utils/mongo");

async function mainaboutus_handler(event) {
  try {
    const { db } = await connectToDatabase();

    // Fetch from `mainaboutus` collection
    const aboutUsData = await db.collection("mainaboutus").find({}).toArray();

    // Ensure format
    const content = aboutUsData.map(data => ({
      title: data.title,
      description: data.description,
      numericValue: data.numericValue,
    }));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow CORS for frontend
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify({ content }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify({
        message: "Failed to fetch Main About Us data",
        error: error.message,
      }),
    };
  }
}

// Add this only for local testing
if (require.main === module) {
    (async () => {
      const response = await mainaboutus_handler({});
      console.log("📦 Main About Us Response:");
      console.log(JSON.stringify(JSON.parse(response.body), null, 2));
    })();
}

module.exports = mainaboutus_handler;
