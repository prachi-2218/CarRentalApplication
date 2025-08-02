const sign_handler  = require("./sign_up.js");
const getcarshandler = require("./get_cars.js")
const recentFeedbacksHandler=require("./recentFeedbacks.js");
const login_handler = require("./login.js");
const feedback_handler = require("./feedback.js");
const getBookingSummaryHandler=require('./get_booking.js');
const faq_handler = require("./faq.js");
const mainaboutus_handler = require("./mainaboutus.js");
const mainMapLocationHandler = require("./mainmap.js")
const createBookingHandler=require("./booking.js");
const report_handler=require("./report.js").handler;

const routing = {
  'POST':{
    '/auth/sign-up':sign_handler,
    '/auth/sign-in':login_handler,
    '/feedbacks': feedback_handler,
    '/bookings':createBookingHandler,
    '/cars':getcarshandler
    
    
  },
  'GET':{
    
    '/cars':getcarshandler,
    '/home/faq' : faq_handler,
    '/home/about-us' : mainaboutus_handler,
    '/home/locations' : mainMapLocationHandler,
    '/bookings':getBookingSummaryHandler,
    '/feedbacks/recent':recentFeedbacksHandler,
     '/reports':report_handler,
  },
    
    
    
}
  
exports.handler = async (event) => {
  try {
    const { httpMethod, path } = event;

    const routeHandler = routing[httpMethod]?.[path];
    if (routeHandler) {
      return await routeHandler(event); 
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Wrong Request" }),
    };

  } catch (error) {
    console.error("Unable to process request", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
