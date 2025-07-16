// models/Application.js
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'interview_scheduled', 'interview_completed', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  
  applicationData: {
    coverLetter: String,
    resumeUrl: String,
    additionalDocuments: [String],
    expectedSalary: Number,
    availableStartDate: Date,
    customAnswers: [{
      question: String,
      answer: String,
    }],
  },
  
  interviewDetails: {
    type: { type: String, enum: ['online', 'onsite', 'phone'] },
    scheduledDate: Date,
    location: String,
    meetingLink: String,
    interviewerName: String,
    interviewerEmail: String,
    notes: String,
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'] },
  },
  
  feedback: {
    fromCompany: String,
    rating: Number,
    interviewFeedback: String,
  },
  
  timeline: [{
    status: String,
    date: Date,
    note: String,
  }],
  
  appliedAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

// Add indexes for better query performance
applicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });
applicationSchema.index({ companyId: 1, status: 1 });
applicationSchema.index({ userId: 1, status: 1 });

export default mongoose.models.Application || mongoose.model('Application', applicationSchema);