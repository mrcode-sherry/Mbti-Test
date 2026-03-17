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
    // ❗ Password now conditionally required (only for credentials users)
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters long"],
      required: function () {
        // Required when provider is missing or explicitly "credentials"
        return !this.provider || this.provider === "credentials";
      },
      select: false, // (optional) avoid returning hash by default
    },

    // New fields for OAuth
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    googleId: {
      type: String,
      default: null,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Register", registerSchema);
