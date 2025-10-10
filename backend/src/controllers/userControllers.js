import User from "../models/userModel.js";
const getAllUser = async (req, res, next) => {
        try {
                const currentUserId = req.auth.userId;
                const users = await User.find({ clerkId: { $ne: currentUserId } });
                res.status(200).json(users);
        } catch (error) {
                console.log("Error in get all user", error);
                next(error);
        }
};
export default { getAllUser };
