import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
const getAllUser = async (req, res, next) => {
        try {
                const { userId: currentUserId } = req.auth();
                const users = await User.find({ clerkId: { $ne: currentUserId } });
                res.status(200).json(users);
        } catch (error) {
                console.log("Error in get all user", error);
                next(error);
        }
};

const getAllMessages = async (req, res, next) => {
        try {
                const { userId } = req.params;
                const myUserId = req.auth().userId;

                // Find if user is exist
                if (myUserId === userId) {
                        return next(new Error("You cannot see your own messages"));
                }

                // Get all messages between current user and the target user
                const messages = await Message.find({
                        $or: [
                                { senderId: myUserId, receiverId: userId },
                                { senderId: userId, receiverId: myUserId },
                        ],
                }).sort({ createdAt: 1 });

                res.status(200).json(messages);
        } catch (error) {
                console.lor("Error in get all message", error);
                next(error);
        }
};
export default { getAllUser, getAllMessages };
