import mongoose, { Schema, Document } from "mongoose";

interface IEvent extends Document {
  img: string;
  title: string;
  date: string;
  link: string;
}

const EventSchema = new Schema<IEvent>({
  img: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  link: { type: String, required: true },
});

const Event =  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);


export default Event