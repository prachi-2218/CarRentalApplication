const { connectToDatabase } = require('./utils/mongo');
const { ObjectId } = require('mongodb');

module.exports = async function getCarsHandler(event) {
  const query = event.queryStringParameters || {};

  const {
    pickupLocationId,
    dropOffLocationId,
    pickupDateTime,
    dropOffDateTime,
    category,
    gearBoxType,
    fuelType,
    minPrice,
    maxPrice,
    page = '1',
    size = '8',
  } = query;

  const skip = (parseInt(page) - 1) * parseInt(size);
  const limit = parseInt(size);

  const filter = {};

  // Match pickupLocationId
  if (pickupLocationId) {
    try {
      filter.location = new ObjectId(pickupLocationId);
    } catch (err) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid pickupLocationId (not a valid ObjectId)' }),
      };
    }
  }

  // Filters
  if (category) filter.category = category;
  if (gearBoxType) filter.gear_box_type = gearBoxType;
  if (fuelType) filter.fuel_type = fuelType;

  const min = parseInt(minPrice);
  const max = parseInt(maxPrice);
  if (!isNaN(min) && !isNaN(max)) {
    filter.price_per_day = { $gte: min, $lte: max };
  } else if (!isNaN(min)) {
    filter.price_per_day = { $gte: min };
  } else if (!isNaN(max)) {
    filter.price_per_day = { $lte: max };
  }

  try {
    const { db } = await connectToDatabase();
    const carsCollection = db.collection('cars');
    const bookingsCollection = db.collection('bookings');

    let conflictingCarIds = [];

    // Handle optional pickupDateTime or dropOffDateTime
    if (pickupDateTime || dropOffDateTime) {
      const pickup = pickupDateTime ? new Date(pickupDateTime) : null;
      const dropoff = dropOffDateTime ? new Date(dropOffDateTime) : null;

      const bookingQuery = {
        $and: [],
      };

      if (pickup && dropoff) {
        bookingQuery.$and.push({ pickup_datetime: { $lt: dropoff } });
        bookingQuery.$and.push({ dropoff_datetime: { $gt: pickup } });
      } else if (pickup) {
        bookingQuery.$and.push({ dropoff_datetime: { $gt: pickup } });
      } else if (dropoff) {
        bookingQuery.$and.push({ pickup_datetime: { $lt: dropoff } });
      }

      // Optional: ignore canceled bookings
      bookingQuery.$and.push({ status: { $ne: 'Cancelled' } });

      const conflictingBookings = await bookingsCollection
        .find(bookingQuery)
        .project({ car_id: 1 })
        .toArray();

      conflictingCarIds = conflictingBookings.map(b => b.car_id.toString());
      console.log('Conflicting Car IDs:', conflictingCarIds);
    }

    // Fetch all cars matching filter
    let cars = await carsCollection.find(filter).toArray();

    // Exclude booked cars
    if (conflictingCarIds.length > 0) {
      cars = cars.filter(car => !conflictingCarIds.includes(car._id.toString()));
    }

    const totalElements = cars.length;
    const pagedCars = cars.slice(skip, skip + limit);

    const enrichedCars = pagedCars.map((car) => {
      const cid = car._id.toString();
      const imageUrl = `https://pbe-team-7-backend-asset-bucket.s3.ap-southeast-2.amazonaws.com/${cid}/${cid}_1.jpg`;

      return {
        carId: cid,
        model: car.model,
        carRating: car.car_rating?.toString() || '4.5',
        serviceRating: car.service_rating?.toString() || '4.8',
        pricePerDay: car.price_per_day?.toString() || '0',
        status: car.status || 'Available',
        location: car.location?.toString() || 'Unknown',
        imageUrl,
      };
    });

    const totalPages = Math.ceil(totalElements / limit);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify({
        content: enrichedCars,
        currentPage: parseInt(page),
        totalElements,
        totalPages,
      }),
    };
  } catch (err) {
    console.error('❌ Failed to get cars:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Not able to get the cars' }),
    };
  }
};




































// const { connectToDatabase } = require('./utils/mongo');
// const { ObjectId } = require('mongodb');

// module.exports = async function getCarsHandler(event) {
//   const query = event.queryStringParameters || {};

//   const {
//     pickupLocationId,
//     dropOffLocationId,
//     pickupDateTime,
//     dropOffDateTime,
//     category,
//     gearBoxType,
//     fuelType,
//     minPrice,
//     maxPrice,
//     page = '1',
//     size = '8',
//   } = query;

//   const skip = (parseInt(page) - 1) * parseInt(size);
//   const limit = parseInt(size);

//   const filter = {};

//   // ✅ Match pickupLocationId with location field (ObjectId)
//   if (pickupLocationId) {
//     try {
//       filter.location = new ObjectId(pickupLocationId);
//     } catch (err) {
//       return {
//         statusCode: 400,
//         body: JSON.stringify({ message: 'Invalid pickupLocationId (not a valid ObjectId)' }),
//       };
//     }
//   }

//   // ✅ Match category directly
//   if (category) filter.category = category;

//   // ✅ Optional filters
//   if (gearBoxType) filter.gear_box_type = gearBoxType;
//   if (fuelType) filter.fuel_type = fuelType;

//   // ✅ Price range filter
//   const min = parseInt(minPrice);
//   const max = parseInt(maxPrice);
//   if (!isNaN(min) && !isNaN(max)) {
//     filter.price_per_day = { $gte: min, $lte: max };
//   } else if (!isNaN(min)) {
//     filter.price_per_day = { $gte: min };
//   } else if (!isNaN(max)) {
//     filter.price_per_day = { $lte: max };
//   }

//   try {
//     const { db } = await connectToDatabase();
//     const carsCollection = db.collection('cars');

//     const totalElements = await carsCollection.countDocuments(filter);
//     const cars = await carsCollection.find(filter).skip(skip).limit(limit).toArray();

//     const enrichedCars = cars.map((car) => {
//       const cid = car._id.toString();
//       const key = `${cid}/${cid}_1.jpg`;
//       const imageUrl = `https://pbe-team-7-backend-asset-bucket.s3.ap-southeast-2.amazonaws.com/${key}`;

//       return {
//         carId: cid,
//         model: car.model,
//         carRating: car.car_rating?.toString() || '4.5',
//         serviceRating: car.service_rating?.toString() || '4.8',
//         pricePerDay: car.price_per_day?.toString() || '0',
//         status: car.status || 'AVAILABLE',
//         location: car.location?.toString() || 'Unknown',
//         imageUrl,
//       };
//     });

//     const totalPages = Math.ceil(totalElements / limit);

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         content: enrichedCars,
//         currentPage: parseInt(page),
//         totalElements,
//         totalPages,
//         pickupDateTime,
//         dropOffDateTime,
//         dropOffLocationId,
//       }),
//     };
//   } catch (err) {
//     console.error('❌ Failed to get cars:', err);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: 'Not able to get the cars' }),
//     };
//   }
// };








