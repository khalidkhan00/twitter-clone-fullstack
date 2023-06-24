import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
import tweetRoutes from "./routes/tweets.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to MongoDB database");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err);
      process.exit(1); // Terminate the Node.js process with a non-zero exit code
    });
};

app.use(cookieParser());
app.use(express.json());

// Enable CORS
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);

app.listen(8000, () => {
  connect();
  console.log("Listening on port 8000");
});










// import express, { request } from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import userRoutes from "./routes/users.js";
// import authRoutes from "./routes/auths.js";
// import tweetRoutes from "./routes/tweets.js";
// import cookieParser from "cookie-parser";


// const app = express();
// dotenv.config();








// const connect = () => {
//   mongoose.set("strictQuery", false);
//   mongoose
//     .connect(process.env.MONGO)
//     .then(() => {
//       console.log("Connected to MongoDB database");
//     })
//     .catch((err) => {
//       console.error("Failed to connect to MongoDB:", err);
//       process.exit(1); // Terminate the Node.js process with a non-zero exit code
//     });
// };

// app.use(cookieParser());
// app.use(express.json());
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/tweets", tweetRoutes);

// app.listen(8000, () => {
//   connect();
//   console.log("Listening on port 8000");
// });


