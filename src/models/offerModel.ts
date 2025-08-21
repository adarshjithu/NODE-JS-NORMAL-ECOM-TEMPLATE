import mongoose, { Schema, Document, Model } from "mongoose";

// Define the TypeScript interface for Offer
export interface IOffer extends Document {
  title: string;
  description?: string;
  discountType: "flat" | "percentage";
  discountValue: number;
  maxDiscountAmount?: number;
  applicableProducts?: mongoose.Types.ObjectId[];
  applicableCategories?: mongoose.Types.ObjectId[];
  applicableBrands?: mongoose.Types.ObjectId[];
  validFrom: Date;
  validTill: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
}

// Define the schema
const offerSchema: Schema<IOffer> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    discountType: {
      type: String,
      enum: ["flat", "percentage"],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    maxDiscountAmount: {
      type: Number, // optional, for percentage offers
    },
    applicableProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    applicableCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    applicableBrands: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
      },
    ],
    validFrom: {
      type: Date,
      required: true,
    },
    validTill: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

// Create and export the model
export default mongoose.model<IOffer>("Offer", offerSchema);

