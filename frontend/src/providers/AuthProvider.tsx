import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
        if (token) {
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
                delete axiosInstance.defaults.headers.common["Authorization"];
        }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
        const { getToken, userId } = useAuth();
        const [loading, setLoading] = useState(true);
        const { checkAdminStatus } = useAuthStore();
        const { initializeSocket, disconnectSocket } = useChatStore();
        useEffect(() => {
                const initAuth = async () => {
                        try {
                                setLoading(true);
                                const token = await getToken();
                                updateApiToken(token);

                                if (token) {
                                        await checkAdminStatus();
                                        // Init socket
                                        if (userId) {
                                                initializeSocket(userId);
                                        }
                                }
                        } catch (error) {
                                updateApiToken(null);
                                console.error("Error initializing authentication:", error);
                        } finally {
                                setLoading(false);
                        }
                };
                initAuth();

                return () => {
                        disconnectSocket();
                };
        }, [getToken, userId, initializeSocket, disconnectSocket, checkAdminStatus]);

        if (loading)
                return (
                        <div className="h-screen w-full flex items-center justify-center">
                                <Loader className="size-8 text-emerald-500 animate-spin" />
                        </div>
                );
        return <div>{children}</div>;
};

export default AuthProvider;
