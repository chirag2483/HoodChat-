import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"

dotenv.config({ path: "./config.env" })

const PORT = process.env.PORT || 4000;

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/auth",authRoutes);



app.listen(PORT, ()=>console.log('Server is running on port ${PORT}'));    