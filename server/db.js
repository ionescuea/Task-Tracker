import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);  
    console.log("MongoDB Atlas connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default connectDB;
