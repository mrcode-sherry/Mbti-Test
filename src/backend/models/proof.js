import mongoose from "mongoose";

const proofSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    screenshotUrl: { type: String, default: "" },
    tid: { type: String, default: "" },

    // ✅ New fields for approval system
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    expiryTime: {
      type: Date, // store when 24 hours expires
      default: null,
    },
  },
  { timestamps: true }
);

const Proof = mongoose.models.Proof || mongoose.model("Proof", proofSchema);
export default Proof;
