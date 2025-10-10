import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
        {
                senderId: {
                        type: String,
                        required: [true, "Sender ID is required"], // Clerk User ID
                },
                receiverId: {
                        type: String,
                        required: [true, "Receiver ID is required"],
                },
                content: {
                        type: String,
                        required: true,
                },
        },
        { timestamps: true }
);

const Message = await mongoose.model("Message", messageSchema);

export default Message;
