// models/JobAlert.js
import mongoose from 'mongoose';

const jobAlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  
  criteria: {
    keywords: [String],
    jobCategory: [String],
    location: [String],
    salaryRange: {
      min: Number,
      max: Number,
    },
    workType: [String],
    experienceLevel: [String],
    companySize: [String],
  },
  
  frequency: {
    type: String,
    enum: ['immediate', 'daily', 'weekly', 'monthly'],
    default: 'daily'
  },
  
  isActive: { type: Boolean, default: true },
  lastSent: Date,
  
  notificationMethods: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
  },
  
}, { timestamps: true });

export default mongoose.models.JobAlert || mongoose.model('JobAlert', jobAlertSchema);