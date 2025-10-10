import mongoose from "mongoose";

export const connectDB = async () => {
        try {
                const result = await mongoose.connect(process.env.MONGODB_URL);
                console.log(`MongoDB connected ${result.connection.host}`);
        } catch (error) {
                console.log("Failed to connect to MongoDB", error);
                process.exit(1);
        }
};
