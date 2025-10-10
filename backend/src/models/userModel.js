import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
        {
                fullName: {
                        type: String,
                        required: [true, "Full name is required"],
                },
                imageUrl: {
                        type: String,
                        required: [true, "Image URL is required"],
                },
                clerkId: {
                        type: String,
                        required: [true, "Clerk ID is required"],
                },
        },
        { timestamps: true } // createdAt,updateAt
);

const User = await mongoose.model("User", userSchema);

export default User;
