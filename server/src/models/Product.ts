import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  ingredients: [{ type: String }]
});

export const Product = mongoose.model<IProduct>('Product', productSchema);
