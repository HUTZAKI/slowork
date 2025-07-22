
import mongoose, { Schema } from "mongoose";

const detailSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: [String],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema(
  {
    userID: {
      type: Number,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
    },
    files: {
      type: [String],
    },
    detail: {
      type: detailSchema,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
