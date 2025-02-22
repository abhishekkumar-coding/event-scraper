import mongoose, { Schema, Document, Model } from "mongoose";


interface IEmail extends Document {
  email: string;
  date?: Date;
}


const EmailSchema: Schema<IEmail> = new Schema({
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
});


const Email: Model<IEmail> = mongoose.models.Email || mongoose.model<IEmail>("Email", EmailSchema);

export default Email;
