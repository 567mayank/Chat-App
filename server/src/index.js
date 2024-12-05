import dotenv from "dotenv"
import connectDB from "./db.js";
import server from "./app.js";

dotenv.config({
  path: './.env'
})

connectDB()
.then(() => {
  server.listen(process.env.PORT || 8000, () => {
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
  })
})
.catch((err) => {
  console.error("MONGO db connection failed !!! ", err);
})