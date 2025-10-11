import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
        const { userId } = req.auth();
        if (!userId) {
                return res.status(401).json({ message: "Unauthorized - you must be logged in" });
        }

        next();
};

export const requireAdmin = async (req, res, next) => {
        try {
                const { userId } = req.auth();
                const currentUser = await clerkClient.users.getUser(userId);
                // Lấy email chính của user
                const userEmail = currentUser.emailAddresses[0].emailAddress;

                // So sánh không phân biệt hoa/thường
                const isAdmin = userEmail.toLowerCase() === (process.env.ADMIN_EMAIL || "").toLowerCase();

                if (!isAdmin) {
                        return res.status(403).json({ message: "Permission denied - you are not an admin" });
                }

                next();
        } catch (error) {
                next(error);
        }
};
