import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { encodeURIComponent } from 'url';

dotenv.config();

// Auto-encode MongoDB credentials
const getEncodedMongoURI = () => {
  const { DB_USER, DB_PASSWORD, CLUSTER_NAME, DB_NAME } = process.env;
  
  if (!DB_USER || !DB_PASSWORD || !CLUSTER_NAME || !DB_NAME) {
    throw new Error('Missing MongoDB environment variables');
  }

  return `mongodb+srv://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASSWORD)}@${CLUSTER_NAME}/${DB_NAME}?retryWrites=true&w=majority`;
};

// Generate JWT secret (if not in .env)
const generateJWTSecret = () => {
  if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = require('crypto').randomBytes(32).toString('hex');
    console.warn('Generated new JWT_SECRET. Add this to your .env file:');
    console.warn(`JWT_SECRET=${process.env.JWT_SECRET}`);
  }
};

const connectDB = async () => {
  try {
    generateJWTSecret(); // Ensure JWT secret exists
    
    const uri = getEncodedMongoURI();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('MongoDB Atlas Connected!');
  } catch (error) {
    console.error(`Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;