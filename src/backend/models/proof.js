import mongoose from "mongoose";

const proofSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    screenshotUrl: { type: String, default: "" },
    tid: { type: String, default: "" },
  },
  { timestamps: true }
);

const Proof = mongoose.models.Proof || mongoose.model("Proof", proofSchema);
export default Proof;
