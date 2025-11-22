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
    schoolClass: String, // ✅ New field: Class 8, 9, or 10
    schoolInstitute: String,

    // College
    collegeYear: String,
    collegeDegree: String,
    collegeInstitute: String,

    // University
    universitySemester: String,
    universityDegree: String,

    // New fields
    favouriteSubjects: { type: [String], required: true }, // min 3
    weakSubjects: { type: [String], required: true },      // min 3
    hobbies: { type: [String], required: true },           // 1–3
    fieldsOfInterest: { type: [String], required: true },  // 1–3
    parentalExpectation: { type: String },
    budgetRange: { type: String, enum: ["Local education", "Abroad", "Scholarships"] },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError
const Test = mongoose.models.Test || mongoose.model("Test", testSchema);
export default Test;
