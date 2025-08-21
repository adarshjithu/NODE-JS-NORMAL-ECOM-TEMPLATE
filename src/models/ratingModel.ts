import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for Review document
export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  rating: number;
  title?: string;
  comment?: string;
  images: string[];
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  verifiedPurchase: boolean;
  helpfulCount: number;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Review model with static method
export interface IReviewModel extends Model<IReview> {
  getAverageRating(productId: mongoose.Types.ObjectId | string): Promise<void>;
}

// Schema
const reviewSchema = new Schema<IReview, IReviewModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true, maxlength: 100 },
    comment: { type: String, trim: true, maxlength: 1000 },
    images: { type: [String], default: [] },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    verifiedPurchase: { type: Boolean, default: false },
    helpfulCount: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

// Prevent duplicate reviews from the same user for the same product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Static method
reviewSchema.statics.getAverageRating = async function (productId: string | mongoose.Types.ObjectId) {
  const result = await this.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId), status: "approved" } },
    { $group: { _id: "$product", averageRating: { $avg: "$rating" }, reviewCount: { $sum: 1 } } },
  ]);

  try {
    await mongoose.model("Product").findByIdAndUpdate(productId, {
      averageRating: result[0]?.averageRating || 0,
      reviewCount: result[0]?.reviewCount || 0,
    });
  } catch (err) {
    console.error(err);
  }
};

// Hooks

// After save
reviewSchema.post("save", function (doc) {
  const ReviewModel = this.constructor as IReviewModel;
  ReviewModel.getAverageRating(doc.product);
});

// After deleteOne (document middleware)
reviewSchema.post("deleteOne", { document: true, query: false }, function (doc) {
  const ReviewModel = this.constructor as IReviewModel;
  ReviewModel.getAverageRating(doc.product);
});

// After findOneAndDelete (query middleware)
reviewSchema.post("findOneAndDelete", async function (doc: any) {
  if (doc) {
    const ReviewModel = mongoose.model("Review") as IReviewModel;
    ReviewModel.getAverageRating(doc.product);
  }
});

const Review = mongoose.model<IReview, IReviewModel>("Review", reviewSchema);

export default Review;
