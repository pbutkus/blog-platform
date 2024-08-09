import express from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({ path: path.join(__dirname, "..", "..", "..", ".env") });

const app = express();

const port = process.env.BACKEND_PORT || 3000;
const dbURI = process.env.MONGODB_URI;

if (!dbURI) {
  console.error("MongoDB URI is not defined in environment variables");
  process.exit(1);
}

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(userRouter);
app.use(postRouter);

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(port, () => {
      console.log(`Backend server running at http://localhost:${port}`);
    });
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));
