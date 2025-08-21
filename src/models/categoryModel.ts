import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  parentCategoryId?: mongoose.Types.ObjectId | null;
  image?: string;
  isActive: boolean;
  isDeleted: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    parentCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    image: { type: String },
    isActive: { type: Boolean, default: true },

    // Soft delete fields
    isDeleted: { type: Boolean, default: false },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICategory>("Category", categorySchema);

