// models/Job.js
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  jobCategory: String,
  province: String,
  organizationType: String,
  workplace: String,
  workDays: String,
  salary: String,
  onlineInterview: Boolean,
  acceptNewGrad: Boolean,
  benefits: {
    socialSecurity: Boolean,
    bonus: Boolean,
    overtime: Boolean,
    commission: Boolean,
    transport: Boolean,
    food: Boolean,
    uniform: Boolean,
    fund: Boolean,
    accommodation: Boolean,
  },
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model('Job', jobSchema);
