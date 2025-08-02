

const AWS = require('aws-sdk');
// const { Parser } = require('json2csv');
const { connectToDatabase } = require('./utils/mongo');
const { ObjectId } = require('mongodb');

// const s3 = new AWS.S3();

const sendResponse = ({ statusCode = 200, success = true, message = '', data = null, error = null }) => {
  return {
    statusCode,
    body: JSON.stringify({
      success,
      message,
      data,
      error
    })
  };
};

exports.handler = async (event) => {
  // let db;

  try {
    const { db } = await connectToDatabase();

    const method = event.httpMethod;
    const path = event.path;
    const queryParams = event.queryStringParameters || {};

    const {
      reportType,
      startDate: qsStartDate,
      endDate: qsEndDate,
      dateFrom,
      dateTo,
      locationId,
      carId,
      supportAgentId
    } = queryParams;
    

    const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

    // Support both naming conventions
    const startDate = qsStartDate || dateFrom;
    const endDate = qsEndDate || dateTo;



    // ---------- GET /reports ----------
    if (method === 'GET' && path === '/reports') {
      if (!startDate || !endDate) {
        return sendResponse({
          statusCode: 400,
          success: false,
          message: 'startDate and endDate are required'
        });
      }

      const start = new Date(startDate);
      const end = new Date(endDate);
      const nextDay = new Date(end);
      nextDay.setDate(nextDay.getDate() + 1);

      let locationName = 'N/A';
      let locationObjectId = null;

      if (locationId && isValidObjectId(locationId)) {
        locationObjectId = new ObjectId(locationId);
        const location = await db.collection('locations').findOne({ _id: locationObjectId });
        if (location && location.locationName) {
          locationName = location.locationName;
        }
      }

            
            const bookingFilter = {
              pickup_datetime: { $gte: start, $lt: nextDay },
              status: { $nin: ['CANCELLED'] }
            };
            if (locationObjectId) {
              bookingFilter.pickup_location_id = locationObjectId;
            }
      
            const bookings = await db.collection('bookings').find(bookingFilter).toArray();
            // console.log('Bookings found:', bookings.length);

      // const bookings = await db.collection('bookings').find({
      //   pickup_datetime: { $gte: start, $lt: nextDay },

      //   status: { $nin: ['CANCELED'] }
      // }).toArray();

      // console.log('Bookings found:', bookings.length);

      // if (locationObjectId) {
      //   bookings.pickup_location_id = locationObjectId;
      // }

      if (reportType === 'sales report') {
        const carGroups = {};

        bookings.forEach(booking => {
          const id = booking.car_id.toString();
          if (!carGroups[id]) carGroups[id] = [];
          carGroups[id].push(booking);
        });

        const uniqueCarIds = Object.keys(carGroups).map(id => new ObjectId(id));
        const cars = await db.collection('cars').find({ _id: { $in: uniqueCarIds } }).toArray();

        const carIdToDetailsMap = {};
        cars.forEach(car => {
          carIdToDetailsMap[car._id.toString()] = {
            model: car.model || 'Unknown',
            carRating: typeof car.car_rating === 'number' ? car.car_rating : null,
            begMilage: car.begMilage ?? 0,          
            endMilage: car.endMilage ?? 0,           
            revenue: car.revenue ?? 0 
          };
        });

        const carReports = [];

        for (const [carIdStr, carBookings] of Object.entries(carGroups)) {
          // const revenue = carBookings.reduce((sum, b) => sum + (b.revenue || 0), 0);
          const totalDays = carBookings.reduce((sum, b) => {
            if (typeof b.booked_days === 'number') return sum + b.booked_days;

            // Calculate difference in days between dropoff and pickup
            const pickup = new Date(b.pickup_datetime);
            const dropoff = new Date(b.dropoff_datetime);
            const diffDays = (dropoff - pickup) / (1000 * 60 * 60 * 24);
            return sum + diffDays;
          }, 0);
          const resDuringPeriod = carBookings.length;

          const carDetails = carIdToDetailsMap[carIdStr]; 
          const begMilage = carDetails?.begMilage ?? 0;   
          const endMilage = carDetails?.endMilage ?? 0;   
          const totalKilometers = endMilage - begMilage;
          const avgMilage = resDuringPeriod ? totalKilometers / resDuringPeriod : 0;

          const revenue = carDetails?.revenue ?? 0;       



          // const begMilage = Math.min(...carBookings.map(b => b.milage_at_pickup || 0));
          // const endMilage = Math.max(...carBookings.map(b => b.milage_at_dropoff || 0));
          // const totalKilometers = endMilage - begMilage;
          // const avgMilage = resDuringPeriod ? totalKilometers / resDuringPeriod : 0;

          const feedbacks = await db.collection('feedbacks').find({ car_id: new ObjectId(carIdStr) }).toArray();
          const ratings = feedbacks.map(f => f.rating).filter(r => typeof r === 'number');
          // const miniFeedback = ratings.length ? Math.min(...ratings) : null;

          carReports.push({
            startDate: start,
            endDate: end,
            location: locationName,
            carModel: carIdToDetailsMap[carIdStr].model,
            carID: carIdStr,
            daysPerCar: totalDays,
            resDuringPeriod,
            begMilage,
            endMilage,
            totalKilometers,
            AvgMilage: avgMilage,
            // deltaAvgMilage: null,
            avgFeedback: carIdToDetailsMap[carIdStr].carRating ?? null,
            // miniFeedback,
            // deltaAvgFeedback: null,
            revenue,
            // deltaRevenue: null
          });
        }

        return sendResponse({ data: { report: carReports } });
      }

      if (reportType === 'staff performance') {
        const supportUsers = await db.collection('users').find({ role: 'Support' }).toArray();
        console.log("Support",supportUsers);
        const staffReports = [];

        const fullEnd = new Date(new Date(endDate).setUTCHours(23, 59, 59, 999));

        for (const user of supportUsers) {
          const bookingsHandled = await db.collection('bookings').find({
            supportAgentId: user._id,
            pickup_datetime: { $gte: new Date(start) },
            dropoff_datetime: { $lt: fullEnd},
            status: { $nin: ['CANCELLED'] }
          }).project({ _id: 1 }).toArray();

          const bookingIds = bookingsHandled.map(b => b._id);
          console.log("Booking Id",bookingIds);
          const feedbacks = await db.collection('feedbacks').find({
            booking_id: { $in: bookingIds }
          }).toArray();

          console.log("feedbacks",feedbacks);

          const ratings = feedbacks.map(f => f.rating).filter(r => typeof r === 'number');
          const avgFeedback = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2) : null;
          // const miniFeedback = ratings.length ? Math.min(...ratings) : null;
          console.log("Booking id:",bookingIds);
          if (bookingIds.length) {
            staffReports.push({
              username: user.firstName+ (user.lastName ? ' ' + user.lastName : ''),
              email: user.email,
              bookingsHandled: bookingIds.length,
              avgFeedback,
              // miniFeedback
            });
          }
        }

        return sendResponse({ data: { report: staffReports } });
      }
    }

    return sendResponse({
      statusCode: 404,
      success: false,
      message: 'Not Found'
    });
  } catch (error) {
    console.error('Report Service Error:', error);
    return sendResponse({
      statusCode: 500,
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};