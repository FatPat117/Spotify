import { usePlayerStore } from "@/store/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
        const audioRef = useRef<HTMLAudioElement>(null);
        const prevSongRef = useRef<string | null>(null);

        const { currentSong, isPlaying, playNext } = usePlayerStore();

        // Handle play/pause logic
        useEffect(() => {
                if (isPlaying) audioRef.current?.play();
                else audioRef.current?.pause();
        }, [isPlaying]);

        // Handle song end
        useEffect(() => {
                const audio = audioRef.current;

                const handleEnded = () => {
                        playNext();
                };

                audio?.addEventListener("ended", handleEnded);

                return () => {
                        audio?.removeEventListener("ended", handleEnded);
                };
        }, [playNext]);

        // Handle song change
        useEffect(() => {
                if (!audioRef.current || !currentSong) return;
                const audio = audioRef.current;

                // If  this is a new song
                const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
                if (isSongChange) {
                        audio.src = currentSong?.audioUrl;
                        // Reset the playback position
                        audio.currentTime = 0;
                        prevSongRef.current = currentSong?.audioUrl;
                        if (isPlaying) audio.play();
                }
        }, [currentSong, isPlaying]);

        // Handle previous song

        return <audio src="" ref={audioRef}></audio>;
};

export default AudioPlayer;
