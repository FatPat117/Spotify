import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface ChatStore {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        users: any[];
        isLoading: boolean;
        error: string | null;
        fetchUsers: () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
        users: [],
        isLoading: true,
        error: null,
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
}));
