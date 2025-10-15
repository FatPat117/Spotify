import Topbar from "@/components/Topbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/store/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import ChatHeader from "./components/ChatHeader";
import MessageInput from "./components/MessageInput";
import UsersLists from "./components/UsersLists";

const formatTime = (date: string) => {
        return new Date(date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
};

const ChatPage = () => {
        const { user } = useUser();
        const { fetchUsers, selectedUser, fetchMessages, messages } = useChatStore();
        useEffect(() => {
                if (user) fetchUsers();
        }, [fetchUsers, user]);

        useEffect(() => {
                if (selectedUser) fetchMessages(selectedUser.clerkId);
        }, [selectedUser, fetchMessages]);

        return (
                <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
                        <Topbar />

                        <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
                                <UsersLists />

                                {/* Chat message */}
                                <div className="flex flex-col h-full">
                                        {selectedUser ? (
                                                <>
                                                        <ChatHeader />

                                                        {/* Messages */}
                                                        <ScrollArea>
                                                                <div className="p-4 space-y-4">
                                                                        {messages.map((message) => {
                                                                                return (
                                                                                        <div
                                                                                                key={message._id}
                                                                                                className={`flex items-center gap-3 ${
                                                                                                        message.senderId ==
                                                                                                        user?.id
                                                                                                                ? "flex-row-reverse"
                                                                                                                : ""
                                                                                                } `}
                                                                                        >
                                                                                                <Avatar className="size-8">
                                                                                                        <AvatarImage
                                                                                                                src={
                                                                                                                        message.senderId ==
                                                                                                                        user?.id
                                                                                                                                ? user.imageUrl
                                                                                                                                : selectedUser.imageUrl
                                                                                                                }
                                                                                                        ></AvatarImage>
                                                                                                </Avatar>

                                                                                                <div
                                                                                                        className={`rounded-lg p-3 max-w-[70%] ${
                                                                                                                message.senderId ==
                                                                                                                user?.id
                                                                                                                        ? "bg-green-500"
                                                                                                                        : "bg-zinc-800"
                                                                                                        }`}
                                                                                                >
                                                                                                        <p className="text-sm">
                                                                                                                {
                                                                                                                        message.content
                                                                                                                }
                                                                                                                <span className="text-xs text-zinc-300 mt-1 block">
                                                                                                                        {formatTime(
                                                                                                                                message.createdAt
                                                                                                                        )}
                                                                                                                </span>
                                                                                                        </p>
                                                                                                </div>
                                                                                        </div>
                                                                                );
                                                                        })}
                                                                </div>
                                                        </ScrollArea>

                                                        {/* Message input */}
                                                        <MessageInput />
                                                </>
                                        ) : (
                                                <NoConversationPlaceHolder />
                                        )}
                                </div>
                        </div>
                </main>
        );
};

const NoConversationPlaceHolder = () => {
        return (
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                        <img src="/spotify.png" alt="spotify" className="size-16 animate-bounce" />
                        <div className="text-center">
                                <h3 className="text-zinc-300 text-lg font-medium mb-1">No conversation selected</h3>
                                <p className="text-zinc-500 text-sm">Choose a friend to start chatting</p>
                        </div>
                </div>
        );
};

export default ChatPage;
