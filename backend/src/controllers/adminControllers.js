import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary.js";
import Album from "../models/albumModel.js";
import Song from "../models/songModel.js";
//helper function to upload to cloudinary
const uploadToCloudinary = async (file) => {
        try {
                const result = await cloudinary.uploader.upload(file.tempFilePath, {
                        resource_type: "auto",
                });
                return result.secure_url;
        } catch (error) {
                console.log("Error in upload to cloudinary", error);
                throw error;
        }
};

const createSong = async (req, res, next) => {
        try {
                if (!req.files || !req.files.audioFile || !req.files.imageFile) {
                        return res.status(400).json({ message: "Missing required files" });
                }
                const { title, artist, albumId, duration } = req.body;
                const audioFile = req.files.audioFile;
                const imageFile = req.files.imageFile;

                const audioUrl = await uploadToCloudinary(audioFile);
                const imageUrl = await uploadToCloudinary(imageFile);

                const song = await Song.create({
                        title,
                        artist,
                        audioUrl,
                        imageUrl,
                        albumId: albumId || null,
                        duration,
                });

                // if song belongs to an album, update the album with the new song
                if (albumId) {
                        await Album.findByIdAndUpdate(albumId, {
                                $push: { songs: song._id },
                        });
                }
                res.status(201).json({ message: "Song created successfully", song });
        } catch (error) {
                console.log("Error in create song", error);
                next(error);
        }
};

const deleteSong = async (req, res, next) => {
        try {
                const { songId } = req.params;

                const song = await Song.findById(songId);

                // if song belongs to an album, remove the song from the album
                if (song.albumId) {
                        await Album.findByIdAndUpdate(song.albumId, {
                                $pull: { songs: song._id },
                        });
                }

                await Song.findByIdAndDelete(songId);
                res.status(200).json({ message: "Song deleted successfully" });
        } catch (error) {
                console.log("Error in delete song", error);
                next(error);
        }
};

const createAlbum = async (req, res, next) => {
        try {
                const { title, artist, releaseYear } = req.body;
                const { imageFile } = req.files;

                const imageUrl = await uploadToCloudinary(imageFile);
                const album = await Album.create({
                        title,
                        artist,
                        imageUrl,
                        releaseYear,
                });
                res.status(201).json({ message: "Album created successfully", album });
        } catch (error) {
                console.log("Error in create album", error);
                next(error);
        }
};

const deleteAlbum = async (req, res, next) => {
        try {
                const { albumId } = req.params;

                // Delete all the songs in the album
                await Song.deleteMany({ albumId: new mongoose.Types.ObjectId(albumId) });

                const album = await Album.findByIdAndDelete(albumId);

                res.status(200).json({ message: "Album deleted successfully" });
        } catch (error) {
                console.log("Error in delete album", error);
                next(error);
        }
};

const checkAdmin = async (req, res, next) => {
        try {
                res.status(200).json({ isAdmin: true, message: "Admin checked successfully" });
        } catch (error) {
                console.log("Error in check admin", error);
                next(error);
        }
};
export default { createSong, deleteSong, createAlbum, deleteAlbum, checkAdmin };
