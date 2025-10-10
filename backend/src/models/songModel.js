import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
        {
                title: {
                        type: String,
                        required: [true, "Title is required"],
                },
                artist: {
                        type: String,
                        required: [true, "Artist is required"],
                },
                imageUrl: {
                        type: String,
                        required: [true, "Image URL is required"],
                },
                audioUrl: {
                        type: String,
                        required: [true, "Audio URL is required"],
                },
                duration: {
                        type: Number,
                        required: [true, "Duration is required"],
                },
                albumId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Album",
                        required: false,
                },
        },
        { timestamps: true }
);

const Song = await mongoose.model("Song", songSchema);

export default Song;
