import type { Song } from "@/types";
import { create } from "zustand";
import { useChatStore } from "./useChatStore";

interface PlayerStore {
        currentSong: Song | null;
        isPlaying: boolean;
        queue: Song[];
        currentIndex: number;

        initializeQueue: (songs: Song[]) => void;
        playAlbum: (songs: Song[], startIndex?: number) => void;
        setCurrentSong: (song: Song | null) => void;
        togglePlay: () => void;
        playNext: () => void;
        playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
        currentSong: null,
        isPlaying: false,
        queue: [],
        currentIndex: -1,

        initializeQueue: (songs: Song[]) => {
                set({
                        queue: songs,
                        currentSong: get().currentSong || songs[0],
                        currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
                });
        },
        playAlbum: (songs: Song[], startIndex = 0) => {
                if (songs.length <= 0) return;
                const song = songs[startIndex];

                const socket = useChatStore.getState().socket;

                if (socket.auth) {
                        socket.emit("update_activity", {
                                userId: socket.auth.userId,
                                activity: `Playing ${song.title} by ${song.artist}`,
                        });
                }
                set({
                        queue: songs,
                        currentSong: song,
                        currentIndex: startIndex,
                        isPlaying: true,
                });
        },
        setCurrentSong: (song: Song | null) => {
                if (!song) return;
                const songIndex = get().queue.findIndex((s) => s._id === song._id);

                const socket = useChatStore.getState().socket;

                if (socket.auth) {
                        socket.emit("update_activity", {
                                userId: socket.auth.userId,
                                activity: `Playing ${song.title} by ${song.artist}`,
                        });
                }
                set({
                        currentSong: song,
                        currentIndex: songIndex == -1 ? get().currentIndex : songIndex,
                        isPlaying: true,
                });
        },
        togglePlay: () => {
                const currentSong = get().currentSong;

                const socket = useChatStore.getState().socket;

                if (socket.auth) {
                        socket.emit("update_activity", {
                                userId: socket.auth.userId,
                                activity:
                                        !get().isPlaying && currentSong
                                                ? `Playing ${currentSong?.title} by ${currentSong?.artist}`
                                                : "Idle",
                        });
                }

                set((state) => ({ isPlaying: !state.isPlaying }));
        },
        playNext: () => {
                const { queue, currentIndex } = get();
                const nextIndex = currentIndex + 1;

                // If there is a next song to play, let play's it
                if (nextIndex < queue.length) {
                        const nextSong = queue[nextIndex];

                        const socket = useChatStore.getState().socket;

                        if (socket.auth) {
                                socket.emit("update_activity", {
                                        userId: socket.auth.userId,
                                        activity: `Playing ${nextSong.title} by ${nextSong.artist}`,
                                });
                        }
                        set({
                                currentSong: nextSong,
                                currentIndex: nextIndex,
                                isPlaying: true,
                        });
                } else {
                        const socket = useChatStore.getState().socket;

                        if (socket.auth) {
                                socket.emit("update_activity", {
                                        userId: socket.auth.userId,
                                        activity: "Idle",
                                });
                        }
                        set({
                                isPlaying: false,
                        });
                }
        },
        playPrevious: () => {
                const { queue, currentIndex } = get();
                const previousIndex = currentIndex - 1;

                // If there is a previous song to play, let play's it
                if (previousIndex >= 0) {
                        const previousSong = queue[previousIndex];

                        const socket = useChatStore.getState().socket;

                        if (socket.auth) {
                                socket.emit("update_activity", {
                                        userId: socket.auth.userId,
                                        activity: `Playing ${previousSong.title} by ${previousSong.artist}`,
                                });
                        }
                        set({
                                currentSong: previousSong,
                                currentIndex: previousIndex,
                                isPlaying: true,
                        });
                } else {
                        const socket = useChatStore.getState().socket;

                        if (socket.auth) {
                                socket.emit("update_activity", {
                                        userId: socket.auth.userId,
                                        activity: "Idle",
                                });
                        }

                        set({
                                isPlaying: false,
                        });
                }
        },
}));
