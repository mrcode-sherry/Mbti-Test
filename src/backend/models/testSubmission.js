// /backend/models/testSubmission.js
import mongoose from "mongoose";

const testSubmissionSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    completed: { type: Boolean, default: true },
    submittedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const TestSubmission =
  mongoose.models.TestSubmission ||
  mongoose.model("TestSubmission", testSubmissionSchema);

export default TestSubmission;
