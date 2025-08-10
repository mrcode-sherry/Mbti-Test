import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  countryCode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },

  maritalStatus: { type: String, enum: ['single', 'married', ''], default: '' },
  gender: { type: String, enum: ['male', 'female', 'other', ''], default: '' },
  city: { type: String, required: true },
  province: { type: String, required: true },
  age: { type: Number },

  educationType: { type: String, enum: ['school', 'college', 'university', ''], default: '' },

  // School fields
  schoolStatus: { type: String, enum: ['completed', 'continue', ''], default: '' },
  schoolInstitute: { type: String },

  // College fields
  collegeYear: { type: String, enum: ['1st', '2nd', 'completed', ''], default: '' },
  collegeDegree: { type: String },
  collegeInstitute: { type: String },

  // University fields
  universitySemester: { type: String },
  universityDegree: { type: String },
  universityInstitute: { type: String }
}, { timestamps: true });

// Avoid recompilation error in Next.js
const Registration = mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);

export default Registration;
