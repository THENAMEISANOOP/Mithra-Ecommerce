import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "No token provided, please login as admin." });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Forbidden, you are not an admin." });
        }

        req.admin = decoded;
        next();
    } catch (error) {
        console.error("Admin Auth Error:", error);
        res.status(500).json({ success: false, message: "Error in admin authentication." });
    }
};

export default adminAuth;
