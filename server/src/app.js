import express from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import setupSocketIO from "./socket.js";  

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// HTTP route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const server = createServer(app);

setupSocketIO(server);

import userRouter from "./Route/user.route.js";
app.use("/user", userRouter);


export default server;