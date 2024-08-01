import mongoose, { Document, Schema } from 'mongoose';

export interface IImage extends Document {
  url: string;
  filename: string;
  uploadDate: Date;
  user: mongoose.Types.ObjectId;
}

const imageSchema: Schema = new Schema({
  url: { type: String, required: true },
  filename: { type: String, required: true },
  uploadDate: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
});

export const Image = mongoose.model<IImage>('Image', imageSchema);


