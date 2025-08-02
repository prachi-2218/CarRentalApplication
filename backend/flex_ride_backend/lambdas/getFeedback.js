const { connectToDatabase } = require("./utils/mongo");
const { ObjectId } = require("mongodb");

async function getFeedbackHandler(event) {
  try {
    const { client, db } = await connectToDatabase();
    console.log("✅ MongoDB connected successfully.");

    const { bookingId } = event.queryStringParameters || {};

    if (!bookingId) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
        body: JSON.stringify({ message: "Missing bookingId" }),
      };
    }

    if (!ObjectId.isValid(bookingId)) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
        body: JSON.stringify({ message: "Invalid bookingId format" }),
      };
    }

    const bookingObjectId = new ObjectId(bookingId);

    const feedback = await db.collection("feedbacks").findOne({
      booking_id: bookingObjectId,
    });

    if (!feedback) {
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
        body: JSON.stringify({ message: "Feedback not found" }),
      };
    }

    // Safely extract car model
    let carModel = "Unknown";
    if (feedback.car_id && ObjectId.isValid(feedback.car_id)) {
      const car = await db.collection("cars").findOne(
        { _id: new ObjectId(feedback.car_id) },
        { projection: { model: 1 } }
      );
      if (car?.model) {
        carModel = car.model;
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify({
        feedbackId: feedback._id,
        feedbackText: feedback.feedback_text,
        rating: feedback.rating,
        date: feedback.date,
        carModel: carModel,
      }),
    };
  } catch (error) {
    console.error("❌ Error fetching feedback:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify({ message: "Internal server error", error: error.message }),
    };
  }
}

// Local test runner
if (require.main === module) {
  const event = {
    queryStringParameters: {
      bookingId: "64f4b85e5c0e3b0a3c5f95a1", // 🔁 Replace with a valid bookingId in your DB
    },
  };

  getFeedbackHandler(event).then((response) => {
    const data = JSON.parse(response.body);
    console.log("🔍 Status Code:", response.statusCode);
    if (response.statusCode === 200) {
      console.log("✅ Feedback Text:", data.feedbackText);
      console.log("⭐ Rating:", data.rating);
      console.log("📅 Date:", data.date);
      console.log("🚗 Car Model:", data.carModel);
    } else {
      console.log("❌ Error:", data.message);
      if (data.error) {
        console.log("🔧 Internal Error:", data.error);
      }
    }
  });
}

module.exports = getFeedbackHandler;
