import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/useAuthStore";
import { useMusicStore } from "@/store/useMusicStore";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { Album, Music } from "lucide-react";
import { useEffect } from "react";
import DashboardStats from "./components/DashboardStats";
import Header from "./components/Header";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";

const AdminPage = () => {
        const { isAdmin, isLoading } = useAuthStore();
        const { fetchStats, fetchSongs, fetchAlbums } = useMusicStore();

        useEffect(() => {
                fetchAlbums();
                fetchStats();
                fetchSongs();
        }, [fetchAlbums, fetchStats, fetchSongs]);

        if (!isAdmin && !isLoading) {
                return <div>Unauthorized</div>;
        }

        return (
                <div
                        className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
                to-black text-zinc-100 p-8"
                >
                        <Header />

                        {/* Dashboard */}
                        <DashboardStats />

                        <Tabs defaultValue="song" className="space-y-6">
                                <TabsList className="p-2 bg-zinc-800/50">
                                        <TabsTrigger
                                                value="songs"
                                                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white flex items-center justify-center p-1 px-3 rounded-md cursor-pointer capitalize"
                                        >
                                                <Music className="mr-2 size-4" />
                                                Songs
                                        </TabsTrigger>

                                        <TabsTrigger
                                                value="albums"
                                                className="data-[state=active]:bg-zinc-700  data-[state=active]:text-white flex items-center justify-center p-1 px-3 rounded-md cursor-pointer capitalize"
                                        >
                                                <Album className="mr-2 size-4" />
                                                Albums
                                        </TabsTrigger>
                                </TabsList>

                                <TabsContent value="songs">
                                        <SongsTabContent />
                                </TabsContent>
                                <TabsContent value="albums">
                                        <AlbumsTabContent />
                                </TabsContent>
                        </Tabs>
                </div>
        );
};

export default AdminPage;
