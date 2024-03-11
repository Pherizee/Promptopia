import mongoose from "mongoose";

let isConnected = false; // track connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("connected to MongoDB");
    return;
  } else {
    try {
      await mongoose.createConnection(process.env.MONGODB_URI ?? "", {
        dbName: "share_prompt",
      });

      isConnected = true;

      console.log("MongoDB connected");
    } catch (error) {
      console.log(error);
    }
  }
};
