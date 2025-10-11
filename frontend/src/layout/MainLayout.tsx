import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import FriendActivity from "./FriendActivity";
import LeftSidebar from "./LeftSidebar";

const MainLayout = () => {
        const isMobile = false;
        return (
                <div className="h-screen w-full bg-black text-white flex flex-col">
                        <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden">
                                {/* Left sidebar */}
                                <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
                                        <LeftSidebar />
                                </ResizablePanel>

                                <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

                                {/* Main content */}
                                <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                                        <Outlet />
                                </ResizablePanel>

                                <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
                                {/* Right sidebar */}
                                <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                                        <FriendActivity />
                                </ResizablePanel>
                        </ResizablePanelGroup>
                </div>
        );
};

export default MainLayout;
