import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
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
                releaseYear: {
                        type: Number,
                        required: [true, "Release year is required"],
                },
                songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
        },
        { timestamps: true }
);

const Album = await mongoose.model("Album", albumSchema);

export default Album;
