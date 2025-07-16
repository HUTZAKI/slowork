// models/Interview.js
import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  
  type: {
    type: String,
    enum: ['phone', 'video', 'onsite', 'technical', 'hr', 'final'],
    required: true
  },
  
  round: { type: Number, default: 1 },
  
  scheduledDateTime: { type: Date, required: true },
  duration: { type: Number, default: 60 }, // in minutes
  
  location: {
    type: String,
    address: String,
    meetingLink: String,
    platform: String, // zoom, teams, google meet, etc.
  },
  
  interviewer: {
    name: String,
    email: String,
    position: String,
    phone: String,
  },
  
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'rescheduled', 'no_show'],
    default: 'scheduled'
  },
  
  preparationMaterials: [{
    type: String,
    url: String,
    description: String,
  }],
  
  questions: [{
    question: String,
    category: String, // technical, behavioral, situational
    difficulty: String,
    expectedAnswer: String,
    userAnswer: String,
    score: Number,
  }],
  
  evaluation: {
    technicalSkills: Number,
    communication: Number,
    problemSolving: Number,
    culturalFit: Number,
    overall: Number,
    notes: String,
    recommendation: { type: String, enum: ['hire', 'reject', 'maybe', 'next_round'] },
  },
  
  feedback: {
    fromCandidate: String,
    fromInterviewer: String,
    improvements: String,
  },
  
  reminders: [{
    type: String, // email, sms, push
    sentAt: Date,
    scheduledFor: Date,
  }],
  
}, { timestamps: true });

export default mongoose.models.Interview || mongoose.model('Interview', interviewSchema);