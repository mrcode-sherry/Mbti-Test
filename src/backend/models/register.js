import mongoose from "mongoose";

// ✅ Force remove cached model so schema changes apply immediately in dev mode
if (mongoose.models.Register) {
  mongoose.deleteModel("Register");
}

const registerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[\w.%+-]+@(gmail|yahoo|hotmail)\.com$/i,
        "Please enter a valid email address"
      ]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"]
      // 🔹 No regex here — handled in route
    }
  },
  { timestamps: true }
);

export default mongoose.model("Register", registerSchema);
