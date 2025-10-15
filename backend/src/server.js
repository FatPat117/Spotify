import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import fs from "fs";
import { createServer } from "http";
import cron from "node-cron";
import path from "path";
import { connectDB } from "./lib/db.js";
import { initializeSocket } from "./lib/socket.js";
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
app.use(clerkMiddleware()); // this will add auth to req obj => access through req.auth
app.use(express.json()); // to parse express.json
app.use(express.urlencoded({ extended: true }));
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
app.use(
        cors({
                origin: "http://localhost:3000",
                credentials: true,
        })
);

const tempDir = path.join(__dirname, "tmp");
// Delete file every 7 day
cron.schedule("0 0 * * *", () => {
        if (fs.existsSync(tempDir)) {
                fs.readdir(tempDir, (err, files) => {
                        if (err) {
                                console.error("Error reading temp directory:", err);
                                return;
                        }
                        files.forEach((file) => {
                                const filePath = path.join(tempDir, file);
                                const fileStats = fs.statSync(filePath);
                                if (
                                        fileStats.isFile() &&
                                        fileStats.mtime < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                                ) {
                                        fs.unlinkSync(filePath);
                                }
                        });
                });
        }
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

if (process.env.NODE_ENV == "production") {
        app.use(express.static(path.join(__dirname, "../frontend/dist")));
        app.get("/*", (req, res) => {
                res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
        });
}

// Error
app.use((err, req, res, next) => {
        console.log("Error in server", err);
        res.status(500).json({
                message: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
        });
});

// Socket.io
const httpServer = createServer(app);
initializeSocket(httpServer);

httpServer.listen(PORT, () => {
        console.log("server is running on port 5000");
        connectDB();
});
