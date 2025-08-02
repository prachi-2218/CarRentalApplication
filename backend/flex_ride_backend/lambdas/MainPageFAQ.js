
const { connectToDatabase } = require("./utils/mongo");

async function faq_handler(event) {
  try {
    const { db } = await connectToDatabase();

    // Fetch from `faqs` collection
    const faq = await db.collection("faq").find({}).toArray();

    // Ensure format
    const content = faq.map(faq => ({
      question: faq.question,
      answer: faq.answer,
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
        message: "Failed to fetch FAQs",
        error: error.message,
      }),
    };
  }
}

// Add this only for local testing
if (require.main === module) {
    (async () => {
      const response = await faq_handler({});
      console.log("📦 FAQ Response:");
      console.log(JSON.stringify(JSON.parse(response.body), null, 2));
    })();
  }
  

module.exports = faq_handler;
