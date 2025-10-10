import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./lib/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import statRoutes from "./routes/statRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Config
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json()); // to parse express.json
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

app.listen(PORT, () => {
        console.log("server is running on port 5000");
        connectDB();
});
