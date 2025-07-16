// models/Notification.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['application_status', 'interview_reminder', 'job_match', 'message', 'system'],
    required: true
  },
  
  title: { type: String, required: true },
  message: { type: String, required: true },
  
  relatedId: mongoose.Schema.Types.ObjectId, // can reference job, application, interview, etc.
  relatedModel: String, // 'Job', 'Application', 'Interview', etc.
  
  isRead: { type: Boolean, default: false },
  readAt: Date,
  
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  actionRequired: Boolean,
  actionUrl: String,
  
  expiresAt: Date,
  
}, { timestamps: true });

// Add indexes
notificationSchema.index({ userId: 1, isRead: 1 });
notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);