// server/src/db.js
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export function connectDB() {
  return mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1);
    });
}
