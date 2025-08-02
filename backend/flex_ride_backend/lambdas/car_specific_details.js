const { connectToDatabase } = require("./utils/mongo");
const { ObjectId } = require("mongodb");



const car_specific_details = async (event) => {
    try {
      const carId = event.pathParameters?.proxy; // captures value from /cars/{proxy+}
      
      if (!carId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Car ID is required in the URL." }),
        };
      }
  
      const { db } = await connectToDatabase();
      const car = await db.collection("cars").findOne({ _id: new ObjectId(carId) });

      const baseImageUrl = "https://pbe-team-7-backend-asset-bucket.s3.ap-southeast-2.amazonaws.com";
    car.carImageUrl = `${baseImageUrl}/${carId}/${carId}_1.jpg`;
  
      if (!car) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Car not found." }),
        };
      }
  
      return {
        statusCode: 200,
        body: JSON.stringify(car),
      };
  
    } catch (error) {
      console.error("Error fetching car details:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal Server Error", error: error.message }),
      };
    }
  };
  
  module.exports = car_specific_details;