const authCallback = async (req, res) => {
        try {
                const { id, firstName, lastName, imageUrl } = req.body;

                // Check if user already exists
                const user = await User.findOne({ clerkId: id });

                if (!user) {
                        await User.create({
                                clerkId: id,
                                fullName: `${firstName} ${lastName}`,
                                imageUrl,
                        });
                }
                res.status(200).json({ message: "User created successfully" });
        } catch (error) {
                console.log("Error in auth fallback", error);
                res.status(500).json({ message: "Internal server error" });
        }
};

export default { authCallback };
