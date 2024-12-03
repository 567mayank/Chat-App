import dotenv from "dotenv"
// import connectDB from "./DB/index.js";
import connectDB from "./db.js";
import server from "./app.js";

dotenv.config()

connectDB()
.then(() => {
  server.listen(process.env.PORT || 8000, () => {
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
  })
})
.catch((err) => {
  console.log("MONGO db connection failed !!! ", err);
})