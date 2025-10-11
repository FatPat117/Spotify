import MadeForYouSectionSkeleton from "@/components/skeletons/MadeForYouSectionSkeleton";
import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/store/useMusicStore";

const MadeForYouSection = () => {
        const { isLoading, madeForYouSongs, error } = useMusicStore();

        if (isLoading) return <MadeForYouSectionSkeleton />;

        if (error) return <p className="text-red-500 mb-4 text-lg">{error}</p>;

        return (
                <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6">Made For You</h2>
                                <Button
                                        variant={"link"}
                                        className="text-sm text-zinc-400 hover:text-white hover:underline"
                                >
                                        Show All
                                </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {madeForYouSongs.map((song) => (
                                        <div
                                                key={song._id}
                                                className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/50 transition-colors group cursor-pointer relative"
                                        >
                                                <div className="relative mb-4">
                                                        <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                                                                <img
                                                                        src={song.imageUrl}
                                                                        alt={song.title}
                                                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                                />
                                                        </div>
                                                </div>

                                                <h3 className="font-medium mb-2 truncate">{song.title}</h3>
                                                <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
                                        </div>
                                ))}
                        </div>
                </div>
        );
};

export default MadeForYouSection;
