import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  filename: String,
  data: Buffer,
  contentType: String, // e.g., "image/png"
});

export default mongoose.models.Image || mongoose.model('Image', imageSchema);
