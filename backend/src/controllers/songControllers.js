import Song from "../models/songModel.js";
const getAllSongs = async (req, res, next) => {
        try {
                const songs = await Song.find().populate("album").sort({ createdAt: -1 });
                res.status(200).json(songs);
        } catch (error) {
                console.log("Error in get all songs", error);
                next(error);
        }
};

const getFeaturedSongs = async (req, res, next) => {
        try {
                // Fetch 6 random songs using aggregation pipeline (Can't use find() because it will return all the songs)
                const songs = await Song.aggregate([
                        { $sample: { size: 6 } },
                        {
                                $project: {
                                        _id: 1,
                                        title: 1,
                                        imageUrl: 1,
                                        audioUrl: 1,
                                        album: {
                                                _id: 1,
                                        },
                                },
                        },
                ]);
                res.status(200).json(songs);
        } catch (error) {
                console.log("Error in get featured songs", error);
                next(error);
        }
};

const getMadeForYouSongs = async (req, res, next) => {
        try {
                const songs = await Song.aggregate([
                        { $sample: { size: 4 } },
                        {
                                $project: {
                                        _id: 1,
                                        title: 1,
                                        imageUrl: 1,
                                        audioUrl: 1,
                                        album: {
                                                _id: 1,
                                        },
                                },
                        },
                ]);
                res.status(200).json(songs);
        } catch (error) {
                console.log("Error in get made for you songs", error);
                next(error);
        }
};

const getTrendingSongs = async (req, res, next) => {
        try {
                const songs = await Song.aggregate([
                        { $sample: { size: 4 } },
                        {
                                $project: {
                                        _id: 1,
                                        title: 1,
                                        imageUrl: 1,
                                        audioUrl: 1,
                                        album: {
                                                _id: 1,
                                        },
                                },
                        },
                ]);
                res.status(200).json(songs);
        } catch (error) {
                console.log("Error in get trending songs", error);
                next(error);
        }
};
export default { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs };
