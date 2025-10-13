import { axiosInstance } from "@/lib/axios";
import type { Album, Song, Stats } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface MusicStore {
        albums: Album[];
        songs: Song[];
        madeForYouSongs: Song[];
        trendingSongs: Song[];
        featuredSongs: Song[];
        isLoading: boolean;
        error: string | null;
        currentAlbum: Album | null;
        stats: Stats;

        fetchAlbums: () => Promise<void>;
        fetchAlbumById: (albumId: string) => Promise<void>;
        fetchMadeForYouSongs: () => Promise<void>;
        fetchTrendingSongs: () => Promise<void>;
        fetchFeaturedSongs: () => Promise<void>;
        fetchStats: () => Promise<void>;
        fetchSongs: () => Promise<void>;
        deleteSong: (songId: string) => Promise<void>;
        deleteAlbum: (albumId: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
        albums: [],
        songs: [],
        madeForYouSongs: [],
        trendingSongs: [],
        featuredSongs: [],
        isLoading: false,
        error: null,
        currentAlbum: null,
        stats: {
                totalSongs: 0,
                totalAlbums: 0,
                totalUsers: 0,
                totalArtists: 0,
        },

        fetchAlbums: async () => {
                try {
                        set({ isLoading: true, error: null, albums: [] });
                        const response = await axiosInstance.get("/albums");

                        set({ albums: response.data });
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                        set({ error: error?.response?.data?.message });
                        console.log(error);
                } finally {
                        set({ isLoading: false });
                }
        },
        fetchAlbumById: async (albumId: string) => {
                try {
                        set({ isLoading: true, error: null });
                        const response = await axiosInstance.get(`/albums/${albumId}`);
                        set({ currentAlbum: response.data });
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                        set({ error: error?.response?.data?.message });
                        console.log("Error fetching album by id", error);
                } finally {
                        set({ isLoading: false });
                }
        },
        fetchMadeForYouSongs: async () => {
                try {
                        set({ isLoading: true, error: null });
                        const response = await axiosInstance.get("/songs/made-for-you");
                        set({ madeForYouSongs: response.data });
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                        set({ error: error?.response?.data?.message });
                        console.log("Error fetching made for you songs", error);
                } finally {
                        set({ isLoading: false });
                }
        },
        fetchTrendingSongs: async () => {
                try {
                        set({ isLoading: true, error: null });
                        const response = await axiosInstance.get("/songs/trending");
                        set({ trendingSongs: response.data });
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                        set({ error: error?.response?.data?.message });
                        console.log("Error fetching trending songs", error);
                } finally {
                        set({ isLoading: false });
                }
        },
        fetchFeaturedSongs: async () => {
                try {
                        set({ isLoading: true, error: null });
                        const response = await axiosInstance.get("/songs/featured");
                        set({ featuredSongs: response.data });
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                        set({ error: error?.response?.data?.message });
                        console.log("Error fetching featured songs", error);
                } finally {
                        set({ isLoading: false });
                }
        },
        fetchStats: async () => {
                try {
                        set({ isLoading: true, error: null });
                        const response = await axiosInstance.get("/stats");

                        set({ stats: response.data });
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                        console.log("Error fetching stats", error);
                        set({ error: error?.response?.data?.message });
                } finally {
                        set({ isLoading: false });
                }
        },
        fetchSongs: async () => {
                try {
                        set({ isLoading: true, error: null });
                        const response = await axiosInstance.get("/songs");

                        set({ songs: response.data });
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                        console.log("Error fetching songs", error);
                        set({ error: error?.response?.data?.message });
                } finally {
                        set({ isLoading: false });
                }
        },
        deleteSong: async (songId: string) => {
                try {
                        set({ isLoading: true, error: null });
                        await axiosInstance.delete(`/admin/songs/${songId}`);
                        set({ songs: get().songs.filter((song: Song) => song._id !== songId) });
                        toast.success("Song deleted successfully");
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                        set({ error: error?.response?.data?.message });
                        toast.error(error?.response?.data?.message || "Error deleted song");
                        console.log("Error deleting song", error);
                } finally {
                        set({ isLoading: false });
                }
        },
        deleteAlbum: async (albumId: string) => {
                try {
                        set({ isLoading: true, error: null });
                        await axiosInstance.delete(`/admin/albums/${albumId}`);
                        set({
                                albums: get().albums.filter((album: Album) => album._id !== albumId),
                                songs: get().songs.map((song) =>
                                        song.albumId?.toString() === albumId ? { ...song, albumId: null } : song
                                ),
                        });
                        toast.success("Album deleted successfully");
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                        set({ error: error?.response?.data?.message });
                        toast.error(error?.response?.data?.message || "Error deleted album");
                        console.log("Error deleting song", error);
                } finally {
                        set({ isLoading: false });
                }
        },
}));
