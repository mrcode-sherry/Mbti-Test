import mongoose from "mongoose";

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) return;
    
    try {
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error("MONGODB_URI is not defined in .env.local");
        }

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
        
        console.log("✅ Database Connected Successfully");
    } catch (error) {
        console.log("❌ Database Connection Error:", error.message);
        throw error; // Re-throw to handle in API routes
    }
}

export default dbConnect;