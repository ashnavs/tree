import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    console.log('MONGO_URI:', process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;

