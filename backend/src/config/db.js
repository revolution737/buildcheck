const mongoose = require('mongoose');
const logger = require('../utils/logger');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is missing!');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = !!conn.connections[0].readyState;
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Database Connection Error: ${error.message}`);
    // Only exit in local development, not on Vercel
    if (!process.env.VERCEL) {
        process.exit(1);
    }
  }
};

module.exports = connectDB;
