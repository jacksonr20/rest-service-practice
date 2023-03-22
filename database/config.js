import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGODB_CNN);
    console.log('Database: Online');
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong trying to reach the database');
  }
};

export { dbConnection };
