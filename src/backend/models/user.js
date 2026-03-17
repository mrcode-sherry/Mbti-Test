import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  plan: { type: String, enum: ["standard", "premium"], default: "standard" }
});

export default mongoose.models.User || mongoose.model("User", userSchema);
