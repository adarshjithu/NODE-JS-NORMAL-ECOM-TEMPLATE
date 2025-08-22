import mongoose, { Document, Schema } from "mongoose";

export interface IBrand extends Document {
  name: string;
  logo?: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const brandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    logo: { type: String },
    isActive: { type: Boolean, default: true },

    // Soft delete fields
    isDeleted: { type: Boolean, default: false },
   
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IBrand>("Brand", brandSchema);

