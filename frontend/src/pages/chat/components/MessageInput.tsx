import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { SendIcon } from "lucide-react";
import { useState } from "react";

const MessageInput = () => {
        const [newMessage, setNewMessage] = useState("");
        const { user } = useUser();
        const { selectedUser, sendMessage } = useChatStore();

        const handleSendMessage = () => {
                if (newMessage.trim() === "" || !selectedUser || !user) return;
                sendMessage(user.id, selectedUser.clerkId, newMessage.trim());
                setNewMessage("");
        };

        return (
                <div className="p-4 mt-auto border-t border-zinc-800">
                        <div className="flex gap-2">
                                <Input
                                        placeholder="Type a mesasge"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="bg-zinc-800 border-none"
                                        onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                        handleSendMessage();
                                                }
                                        }}
                                />
                                <Button size={"icon"} onClick={handleSendMessage} disabled={!newMessage.trim()}>
                                        <SendIcon className="size-4" />
                                </Button>
                        </div>
                </div>
        );
};

export default MessageInput;
