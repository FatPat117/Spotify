import { axiosInstance } from "@/lib/axios";
import type { Message, User } from "@/types";
import { io } from "socket.io-client";
import { create } from "zustand";
interface ChatStore {
        users: User[];
        isLoading: boolean;
        error: string | null;
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        socket: any;
        isConnected: boolean;
        onlineUsers: Set<string>;
        userActivities: Map<string, string>;
        messages: Message[];
        selectedUser: User | null;

        fetchUsers: () => Promise<void>;
        initializeSocket: (userId: string) => void;
        disconnectSocket: () => void;
        sendMessage: (senderId: string, receiverId: string, content: string) => void;
        fetchMessages: (userId: string) => Promise<void>;
        setSelectedUser: (user: User | null) => void;
}

const baseURL = import.meta.env.MODE == "development" ? "http://localhost:5000" : "";
const socket = io(baseURL, {
        autoConnect: false, // only authenticated user is connect
        withCredentials: true,
});

export const useChatStore = create<ChatStore>((set, get) => ({
        users: [],
        isLoading: true,
        error: null,
        socket: socket,
        isConnected: false,
        onlineUsers: new Set(),
        userActivities: new Map(),
        messages: [],
        selectedUser: null,

        fetchUsers: async () => {
                try {
                        set({ isLoading: true, error: null });
                        const response = await axiosInstance.get("/users");
                        set({ users: response.data });

                        //eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                        console.log("Error in fetchUsers", error);
                        set({ error: error?.response?.data?.message || "Error fetching users" });
                } finally {
                        set({ isLoading: false, error: null });
                }
        },
        initializeSocket: (userId: string) => {
                if (get().isConnected) return;
                socket.auth = { userId };
                socket.connect();

                socket.emit("user_connected", userId);
                socket.on("users_online", (onlineUsers: string[]) => {
                        set({ onlineUsers: new Set(onlineUsers) });
                });

                socket.on("activity_updated", (activity: [string, string][]) => {
                        set({ userActivities: new Map(activity) });
                });

                socket.on("user_connected", (userId: string) => {
                        set({ onlineUsers: new Set([...get().onlineUsers, userId]) });
                });

                socket.on("user_disconnected", (userId: string) => {
                        set((state) => {
                                const newOnlineUsers = new Set(state.onlineUsers);
                                newOnlineUsers.delete(userId);
                                return { onlineUsers: newOnlineUsers };
                        });
                });

                socket.on("receive_message", (message: Message) => {
                        set((state) => {
                                const newMessages = [...state.messages, message];
                                return { messages: newMessages };
                        });
                });

                socket.on("message_sent", (message: Message) => {
                        set((state) => {
                                const newMessages = [...state.messages, message];
                                return { messages: newMessages };
                        });
                });

                socket.on("activity_updated", (activity: { userId: string; activity: string }) => {
                        set((state) => {
                                const newMapActivities = new Map(state.userActivities);
                                newMapActivities.set(activity.userId, activity.activity);
                                return { userActivities: newMapActivities };
                        });
                });

                set({ isConnected: true });
        },
        disconnectSocket: () => {
                if (!get().isConnected) return;
                socket.disconnect();
                set({ isConnected: false });
        },
        sendMessage: (senderId: string, receiverId: string, content: string) => {
                if (!get().isConnected || !get().socket) return;
                socket.emit("send_message", { senderId, receiverId, content });
        },

        fetchMessages: async (userId: string) => {
                set({ isLoading: true, error: null });
                try {
                        const response = await axiosInstance.get(`/users/messages/${userId}`);
                        set({ messages: response.data });

                        //eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                        console.log("Error in fetchMessages", error);
                        set({ error: error?.response?.data?.message || "Error fetching messages" });
                } finally {
                        set({ isLoading: false, error: null });
                }
        },

        setSelectedUser: (user: User | null) => {
                set({ selectedUser: user });
        },
}));
