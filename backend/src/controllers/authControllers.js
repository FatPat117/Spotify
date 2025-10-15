import User from "../models/userModel.js";
const authCallback = async (req, res, next) => {
        try {
                const { id, firstName, lastName, imageUrl } = req.body;

                // Check if user already exists
                const user = await User.findOne({ clerkId: id });

                if (!user) {
                        const newUser = await User.create({
                                clerkId: id,
                                fullName: `${firstName || ""} ${lastName || ""}`.trim(),
                                imageUrl,
                        });
                        return res.status(200).json({
                                message: "User created successfully",
                                user: newUser,
                        });
                }
                res.status(200).json({
                        message: "User already exists",
                        user: user,
                });
        } catch (error) {
                console.log("Error in auth fallback", error);
                next(error);
        }
};

export default { authCallback };
