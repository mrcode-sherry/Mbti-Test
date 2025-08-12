import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^[\w.%+-]+@(gmail|yahoo|hotmail)\.com$/i, "Invalid email format"]
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10,15}$/, "Invalid phone number"]
    },
    subject: {
      type: String,
      required: true,
      enum: ["Test Issues", "Payment Issue", "General Inquiry", "Other"],
      default: "Other"
    },
    maritalStatus: {
      type: String,
      required: true,
      enum: ["Single", "Married"]
    },
    message: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default Contact;
