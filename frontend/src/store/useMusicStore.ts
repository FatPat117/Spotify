import { axiosInstance } from "@/lib/axios";
import type { Album, Song } from "@/types";
import { create } from "zustand";

interface MusicStore {
        albums: Album[];
        songs: Song[];
        isLoading: boolean;
        error: string | null;
        currentAlbum: Album | null;

        fetchAlbums: () => Promise<void>;
        fetchAlbumById: (albumId: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
        albums: [],
        songs: [],
        isLoading: false,
        error: null,
        currentAlbum: null,
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
}));
