import mongoose from "mongoose";

const ProofSubmissionSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    proofSubmitted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.ProofSubmission ||
  mongoose.model("ProofSubmission", ProofSubmissionSchema);
