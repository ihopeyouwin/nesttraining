import * as mongoose from 'mongoose';

export const unitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export interface Unit extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
}
