const { connectToDatabase } = require("./utils/mongo");
const { ObjectId } = require("mongodb");

async function feedback_handler(event) {
  try {
    const { client, db } = await connectToDatabase();
    console.log("Connected to DB:", db.databaseName);
    const body = JSON.parse(event.body);

    const { feedbackId, bookingId, carId, clientId, feedbackText, rating } =
      body;

    // Simple validation
    if (!bookingId || !carId || !clientId || !feedbackText || !rating) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, PUT",
        },
        body: JSON.stringify({
          message: "Missing required fields",
        }),
      };
    }

    if (feedbackId) {
      // UPDATE existing feedback
      const result = await db.collection("feedbacks").updateOne(
        { _id: new ObjectId(feedbackId) },
        {
          $set: {
            booking_id: new ObjectId(bookingId),
            car_id: new ObjectId(carId),
            client_id: new ObjectId(clientId),
            feedback_text: feedbackText,
            rating: parseInt(rating),
            updatedAt: new Date(),
          },
        }
      );

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, PUT",
        },
        body: JSON.stringify({
          message: "Feedback updated successfully",
          modifiedCount: result.modifiedCount,
        }),
      };
    } else {
      // CREATE new feedback
      const newFeedback = {
        booking_id: new ObjectId(bookingId),
        car_id: new ObjectId(carId),
        client_id: new ObjectId(clientId),
        feedback_text: feedbackText,
        rating: parseInt(rating),
        date: new Date(),
      };

      const result = await db.collection("feedbacks").insertOne(newFeedback);
      console.log("insert Result", result);
      const insertedId = result.insertedId;

      return {
        statusCode: 201,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, PUT",
        },
        body: JSON.stringify({
          feedbackId: insertedId,
          systemMessage: "Feedback has been successfully created",
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, PUT",
      },
      body: JSON.stringify({
        message: "Error processing feedback",
        error: error.message,
      }),
    };
  }
}

module.exports = feedback_handler;
