const { connectToDatabase } = require("./utils/mongo"); // Adjust the path as needed

async function mainMapLocationHandler(event) {
  try {
    const { db } = await connectToDatabase();

    const locations = await db.collection("locations").find({}).toArray();

    // Format output (optional, only return needed fields)
    const content = locations.map(loc => ({
      locationName: loc.locationName,
      locationAddress: loc.locationAddress,
      locationImageUrl: loc.locationImageUrl,
    }));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET"
      },
      body: JSON.stringify({ content }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET"
      },
      body: JSON.stringify({
        message: "Failed to fetch locations",
        error: error.message,
      }),
    };
  }
}

module.exports = mainMapLocationHandler;

// Optional: Local test
// if (require.main === module) {
//   (async () => {
//     const res = await mainMapLocationHandler({});
//     console.log(JSON.stringify(JSON.parse(res.body), null, 2));
//   })();
// }
