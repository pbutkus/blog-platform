import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes";

dotenv.config({ path: path.join(__dirname, "..", "..", "..", ".env") });

const app = express();

const port = process.env.BACKEND_PORT || 3000;
const dbURI = process.env.MONGODB_URI;

if (!dbURI) {
  console.error("MongoDB URI is not defined in environment variables");
  process.exit(1);
}

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express!" });
});

app.use(userRouter);

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(port, () => {
      console.log(`Backend server running at http://localhost:${port}`);
    });
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));
