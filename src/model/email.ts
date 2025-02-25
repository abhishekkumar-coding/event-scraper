import mongoose, { Schema, Document, Model } from "mongoose";

interface IEmail extends Document {
  email: string;
  number: string;
  otp: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const EmailSchema: Schema<IEmail> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    otp: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

// Avoid redefining the model if it already exists
const Email: Model<IEmail> =
  mongoose.models.Email || mongoose.model<IEmail>("Email", EmailSchema);

export default Email;
