import { clerkMiddleware } from "@clerk/express";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
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
const __dirname = path.resolve();

// Middleware
app.use(express.json()); // to parse express.json
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware()); // this will add auth to req obj => access through req.auth
app.use(
        fileUpload({
                useTempFiles: true,
                tempFileDir: path.join(__dirname, "tmp"),
                createParentPath: true,
                limits: {
                        fileSize: 10 * 1024 * 1024,
                },
        })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// Error
app.use((err, req, res, next) => {
        console.log("Error in server", err);
        res.status(500).json({
                message: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
        });
});
app.listen(PORT, () => {
        console.log("server is running on port 5000");
        connectDB();
});
