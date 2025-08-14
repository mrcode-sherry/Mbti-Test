import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  countryCode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  maritalStatus: { 
    type: String, 
    enum: ['single', 'married'],
    required: true 
  },
  gender: { 
    type: String, 
    enum: ['male', 'female', 'other'], 
    required: true 
  },
  city: { type: String, required: true },
  province: { type: String, required: true },
  age: { type: Number },
  educationType: { 
    type: String, 
    enum: ['school', 'college', 'university'], 
    required: true 
  },

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

export default mongoose.model('Test', testSchema);
