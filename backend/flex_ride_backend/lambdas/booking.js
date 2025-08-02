const { connectToDatabase } = require("./utils/mongo");
const { ObjectId } = require("mongodb");

// Format helpers
function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
}

function formatTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

async function createBookingHandler(event) {
  let client;

  try {
    const dbConn = await connectToDatabase();
    const db = dbConn.db;
    client = dbConn.client;

    const bookings = db.collection("bookings");

    // Step 1: Parse request body
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (err) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid JSON format" }),
      };
    }

    const {
      carId,
      clientId,
      pickupLocationId,
      dropOffLocationId,
      pickupDateTime,
      dropOffDateTime,
      carMake,
      carModel,
      carYear,
    } = body;

    // Step 2: Validate required fields
    if (
      !carId ||
      !clientId ||
      !pickupLocationId ||
      !dropOffLocationId ||
      !pickupDateTime ||
      !dropOffDateTime ||
      !carMake ||
      !carModel ||
      !carYear
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required fields in request" }),
      };
    }

    // Step 3: Convert types
    const carObjectId = new ObjectId(carId);
    const clientObjectId = new ObjectId(clientId);
    const pickupLocationObjectId = new ObjectId(pickupLocationId);
    const dropOffLocationObjectId = new ObjectId(dropOffLocationId);
    const pickupDate = new Date(pickupDateTime);
    const dropOffDate = new Date(dropOffDateTime);
    const now = new Date();

    // Step 4: Insert booking
    // const bookingNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit
    const bookingNumber = Math.floor(Math.random() * 1000000000).toString();


    await bookings.insertOne({
      booking_number: bookingNumber,
      car_id: carObjectId,
      client_id: clientObjectId,
      pickup_location_id: pickupLocationObjectId,
      dropoff_location_id: dropOffLocationObjectId,
      pickup_datetime: pickupDate,
      dropoff_datetime: dropOffDate,
      made_by: "admin_user_01",
      created_at: now,
      status: "Reserved",
    });

    // Step 5: Success message
    const message = `New booking was successfully created for ${carMake} ${carModel} ${carYear}.\nBooking #${bookingNumber} from ${formatDate(pickupDate)} to ${formatDate(dropOffDate)}.`;

    return {
      statusCode: 200,
      body: JSON.stringify({ message }),
    };
  } catch (err) {
    console.error("Booking Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  } finally {
    if (client) await client.close();
  }
}

module.exports = createBookingHandler;
