// models/UserProfile.js
import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalInfo: {
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    phoneNumber: String,
    address: String,
    province: String,
    district: String,
    subDistrict: String,
    zipCode: String,
    profilePicture: String,
  },
  education: [{
    level: String, // high school, bachelor, master, etc.
    institution: String,
    major: String,
    gpa: Number,
    graduationYear: Number,
    isCurrentlyStudying: Boolean,
  }],
  experience: [{
    jobTitle: String,
    company: String,
    startDate: Date,
    endDate: Date,
    isCurrentJob: Boolean,
    description: String,
    responsibilities: [String],
  }],
  skills: [{
    name: String,
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] },
    category: String, // technical, soft skills, language, etc.
  }],
  languages: [{
    name: String,
    proficiency: { type: String, enum: ['basic', 'conversational', 'fluent', 'native'] },
  }],
  certifications: [{
    name: String,
    issuer: String,
    issueDate: Date,
    expiryDate: Date,
    credentialId: String,
  }],
  preferences: {
    desiredJobCategory: [String],
    desiredSalary: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'THB' },
    },
    preferredLocation: [String],
    workType: [String], // remote, onsite, hybrid
    availableStartDate: Date,
    willingToRelocate: Boolean,
  },
  portfolio: [{
    title: String,
    description: String,
    url: String,
    imageUrl: String,
    technologies: [String],
  }],
  socialMedia: {
    linkedin: String,
    github: String,
    website: String,
    twitter: String,
  },
  resume: {
    url: String,
    fileName: String,
    uploadDate: Date,
  },
  isProfileComplete: { type: Boolean, default: false },
  profileCompletionPercentage: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.UserProfile || mongoose.model('UserProfile', userProfileSchema);