const { connectToDatabase } = require("./utils/mongo");
const bcrypt = require("bcryptjs");

async function sign_handler (event){

  

  try {
    const { client, db } = await connectToDatabase();

    const body = JSON.parse(event.body);

    const { firstName, lastName, email, password } = body;
    const role = "client"; // default role

    const nameRegex = /^[a-zA-Z]{2,}$/;
    const lastnameRegex = /^[a-zA-Z]{1,}$/
    const mailRegex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z-]*[a-zA-Z]:[^\]]+)\]))$/;
    const passRegex = /^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/
    // Validate input
    if (
      !firstName || !nameRegex.test(firstName) ||
      (lastName && !lastnameRegex.test(lastName)) ||
      !email || !mailRegex.test(email) ||
      !password || !passRegex.test(password)
    ) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
        },
        body: JSON.stringify({
          message: "Invalid input. Please check all fields.",
        }),
      };
    }

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return {
        statusCode: 409, 
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
        },
        body: JSON.stringify({
          message: "User already exists with this email.",
        }),
      };
    }



    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    const result = await db.collection("users").insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    });

    return {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify({
        message: "User inserted successfully!",
        userId: result.insertedId,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify({
        message: "Error inserting user",
        error: error.message,
      }),
    };
  }
};

module.exports = sign_handler