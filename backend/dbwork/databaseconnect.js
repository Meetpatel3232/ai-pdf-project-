
const mongoose = require("mongoose");
require("dotenv").config();

async function Dbconnect() {
  try {
    await mongoose.connect(process.env.DBURL, {
     serverSelectionTimeoutMS: 10000,
      autoSelectFamily: false,
    });

    console.log("MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}

module.exports = Dbconnect;
