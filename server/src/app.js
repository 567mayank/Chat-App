import express from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import setupSocketIO from "./socket.js";  

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// HTTP route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get('/keep-alive', (req, res) => {
  res.status(200).send('OK');
});

const server = createServer(app);

setupSocketIO(server);

import userRouter from "./Route/user.route.js";
import chatRouter from "./Route/chat.route.js";

app.use("/user", userRouter);
app.use("/chat", chatRouter)

export default server;