import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  industry: String,
  location: String,
  website: String,
  contactEmail: String,
  contactPhone: String,
  logo: String,
  establishedYear: Number,
  companySize: String,
  requirements: String,
  priorities: String,
  benefits: [String],
  workingHours: String,
  dresscode: String,
  companyHistory: String,
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
}, { timestamps: true });

export default mongoose.models.Company || mongoose.model('Company', companySchema);