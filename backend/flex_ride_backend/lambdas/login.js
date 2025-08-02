
const { connectToDatabase } = require("./utils/mongo");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 const { MongoClient } = require("mongodb");
const JWT_SECRET = "your-secret-key";
 
async function login_handler(event) {
  try {
    const { client, db } = await connectToDatabase();
    const body = JSON.parse(event.body);
    const { email, password } = body;
 
    if (!email || !password) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({ message: "Email and password are required." }),
      };
    }
 
    const user = await db.collection("users").findOne({ email });
 
    if (!user) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({ message: "Invalid username/password supplied" }),
      };
    }
 
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({ message: "Invalid username/password supplied" }),
      };
    }
 
    // Create JWT
    const token = jwt.sign(
{ userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({
        token,
        role: user.role,
        userId: user._id,
        userImageUrl: `https://pbe-team-7-backend-asset-bucket.s3.ap-southeast-2.amazonaws.com/avatar.png`,
        username: `${user.firstName} ${user.lastName}`,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ message: "Login failed", error: error.message }),
    };
  }
}
 
function corsHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
  };
}
module.exports = login_handler;




