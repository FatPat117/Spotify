const MadeForYouSectionSkeleton = () => {
        return (
                <div className="mb-8">
                        <div content="h-8 w-48 bg-zinc-800 rounded mb-4 animate-pulse">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {Array.from({ length: 4 }).map((_, index) => (
                                                <div
                                                        key={index}
                                                        className="bg-zinc-800/40 p-4 rounded-md animate-pulse"
                                                >
                                                        <div className="aspect-square rounded-md bg-zinc-700 mb-4"></div>
                                                        <div className="h-4 w-3/4 rounded bg-zinc-700 mb-2"></div>
                                                        <div className="h-4 w-1/2 rounded bg-zinc-700 "></div>
                                                </div>
                                        ))}
                                </div>
                        </div>
                </div>
        );
};

export default MadeForYouSectionSkeleton;
