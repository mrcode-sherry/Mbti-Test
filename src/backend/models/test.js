import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    countryCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    educationType: { type: String, required: true },

    // School
    schoolStatus: String,
    schoolInstitute: String,

    // College
    collegeYear: String,
    collegeDegree: String,
    collegeInstitute: String,

    // University
    universitySemester: String,
    universityDegree: String,
  },
  { timestamps: true }
);

// Prevent OverwriteModelError
const Test = mongoose.models.Test || mongoose.model("Test", testSchema);
export default Test;
