import Topbar from "@/components/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useEffect } from "react";
import FeaturedSection from "./FeaturedSection";
import MadeForYouSection from "./MadeForYouSection";
import TrendingSection from "./TrendingSection";

const HomePage = () => {
        const {
                fetchFeaturedSongs,
                fetchTrendingSongs,
                fetchMadeForYouSongs,
                madeForYouSongs,
                featuredSongs,
                trendingSongs,
                isLoading,
        } = useMusicStore();

        useEffect(() => {
                fetchFeaturedSongs();
                fetchTrendingSongs();
                fetchMadeForYouSongs();
        }, [fetchFeaturedSongs, fetchTrendingSongs, fetchMadeForYouSongs]);

        const { initializeQueue } = usePlayerStore();
        useEffect(() => {
                if (madeForYouSongs.length >= 0 && featuredSongs.length >= 0 && trendingSongs.length >= 0) {
                        const allSongs = [...madeForYouSongs, ...featuredSongs, ...trendingSongs];
                        initializeQueue(allSongs);
                }
        }, [madeForYouSongs, featuredSongs, trendingSongs, initializeQueue]);

        if (isLoading) return null;
        return (
                <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
                        <Topbar />
                        <ScrollArea className="h-[calc(100vh-180px)]">
                                <div className="p-4 sm:p-6">
                                        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Featured Songs</h1>
                                        <FeaturedSection />

                                        <div className="space-y-8">
                                                {/* Made For you */}
                                                <MadeForYouSection />

                                                {/* Trending  */}
                                                <TrendingSection />
                                        </div>
                                </div>
                        </ScrollArea>
                </main>
        );
};

export default HomePage;
