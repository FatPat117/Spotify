import { Server } from "socket.io";
import Message from "../models/messageModel.js";

export const initializeSocket = (httpServer) => {
        const io = new Server(httpServer, {
                cors: {
                        origin: "http://localhost:3000",
                        credentials: true,
                },
        });

        const userSocket = new Map(); // {userId,socketId}
        const userActivity = new Map(); // {userId,activity}

        // Listen for new connections
        io.on("connection", (socket) => {
                socket.on("user_connected", (userId) => {
                        userSocket.set(userId, socket.id);
                        userActivity.set(userId, "Idle");

                        // broadcast to all users
                        io.emit("user_connected", userId);

                        // send to the current user which users is online
                        socket.emit("users_online", Array.from(userSocket.keys()));

                        io.emit("activities", Array.from(userActivity.entries()));
                });

                // Update user activity
                socket.on("update_activity", ({ userId, activity }) => {
                        userSocket.set(userId, activity);

                        // Broadcast to everyone
                        io.emit("activity_updated", { userId, activity });
                });

                // Send message
                socket.on("send_message", async (data) => {
                        try {
                                const { senderId, receiverId, content } = data;
                                const message = await Message.create({
                                        senderId,
                                        receiverId,
                                        content,
                                });

                                // Send to receiver in realtime, if they're online
                                const receiverSocketId = userSocket.get(receiverId);
                                if (receiverSocketId) {
                                        io.to(receiverSocketId).emit("receive_message", message);
                                }

                                socket.emit("message_sent", message);
                        } catch (error) {
                                console.error("Message error", error);
                                socket.emit("message_error", error.message);
                        }
                });

                // User disconnected
                socket.on("disconnect", () => {
                        let disconnectedUserId = null;
                        for (const [userId, socketId] of userSocket.entries()) {
                                if (socketId === socket.id) {
                                        disconnectedUserId = userId;
                                        break;
                                }
                        }
                        if (disconnectedUserId) {
                                userSocket.delete(disconnectedUserId);
                                userActivity.delete(disconnectedUserId);

                                io.emit("user_disconnected", disconnectedUserId);
                        }
                });
        });
};
