import mongoose, { ConnectOptions } from "mongoose";
import { config } from "dotenv";

config(); // Load environment variables

const connectDB = async (): Promise<void> => {
  const clientOptions: ConnectOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  };
  const DB_URI =
    process.env.NODE_ENV === "development"
      ? process.env.MONGODB_URI_DEV
      : process.env.MONGODB_URI_PROD;
  try {
    const conn = await mongoose.connect(DB_URI as string, clientOptions);

    await mongoose.connection.db.admin().command({ ping: 1 });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    await mongoose.disconnect();
    process.exit(1);
  }
};

export default connectDB;
