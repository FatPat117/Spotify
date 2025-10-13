import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AudioPlayer from "./components/AudioPlayer";
import FriendActivity from "./components/FriendActivity";
import LeftSidebar from "./components/LeftSidebar";
import PlaybackControls from "./components/PlaybackControls";
const MainLayout = () => {
        const [isMobile, setIsMobile] = useState(false);

        useEffect(() => {
                const checkMobile = () => {
                        setIsMobile(window.innerWidth < 768);
                };
                checkMobile();
                window.addEventListener("resize", checkMobile);
        }, []);

        return (
                <div className="h-screen w-full bg-black text-white flex flex-col">
                        <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden">
                                <AudioPlayer />
                                {/* Left sidebar */}
                                <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
                                        <LeftSidebar />
                                </ResizablePanel>

                                <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

                                {/* Main content */}
                                <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                                        <Outlet />
                                </ResizablePanel>

                                {!isMobile && (
                                        <>
                                                <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
                                                {/* Right sidebar */}
                                                <ResizablePanel
                                                        defaultSize={20}
                                                        minSize={0}
                                                        maxSize={25}
                                                        collapsedSize={0}
                                                >
                                                        <FriendActivity />
                                                </ResizablePanel>
                                        </>
                                )}
                        </ResizablePanelGroup>

                        <PlaybackControls />
                </div>
        );
};

export default MainLayout;
