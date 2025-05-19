import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import connectDB from "./Db/connect.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json()); // from req.body
app.use(cookieParser()); // for cookies


app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});




app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server is running on port ${PORT}`);
});    
