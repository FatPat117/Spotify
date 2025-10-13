import Album from "../models/albumModel.js";
import Song from "../models/songModel.js";
import User from "../models/userModel.js";

const getAllStats = async (req, res, next) => {
        try {
                const [totalSongs, totalUsers, totalAlbums, uniqueArtists] = await Promise.all([
                        Song.countDocuments(),
                        User.countDocuments(),
                        Album.countDocuments(),
                        Song.aggregate([
                                {
                                        $unionWith: {
                                                coll: "albums",
                                                pipeline: [],
                                        },
                                },
                                {
                                        $group: {
                                                _id: "$artist",
                                        },
                                },
                                { $count: "count" },
                        ]),
                ]);
                res.status(200).json({
                        totalSongs,
                        totalUsers,
                        totalAlbums,
                        totalArtists: uniqueArtists[0]?.count || 0,
                });
        } catch (error) {
                console.log("Error in get all stats", error);
                next(error);
        }
};
export default { getAllStats };
