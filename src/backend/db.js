import mongoose from "mongoose";

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        const uri = process.env.MONGODB_URI;

        if (!uri) throw new Error("MONGODB_URI is not defined in .env") 
            await mongoose.connect(uri);
        console.log("✅ Database Connected")
    } catch (error) {
        console.log("❌ Database Connection Error:", error)
    }
}

export default dbConnect;