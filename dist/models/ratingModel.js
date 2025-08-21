"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Schema
const reviewSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true, maxlength: 100 },
    comment: { type: String, trim: true, maxlength: 1000 },
    images: { type: [String], default: [] },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    verifiedPurchase: { type: Boolean, default: false },
    helpfulCount: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
}, { timestamps: true });
// Prevent duplicate reviews from the same user for the same product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });
// Static method
reviewSchema.statics.getAverageRating = function (productId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const result = yield this.aggregate([
            { $match: { product: new mongoose_1.default.Types.ObjectId(productId), status: "approved" } },
            { $group: { _id: "$product", averageRating: { $avg: "$rating" }, reviewCount: { $sum: 1 } } },
        ]);
        try {
            yield mongoose_1.default.model("Product").findByIdAndUpdate(productId, {
                averageRating: ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.averageRating) || 0,
                reviewCount: ((_b = result[0]) === null || _b === void 0 ? void 0 : _b.reviewCount) || 0,
            });
        }
        catch (err) {
            console.error(err);
        }
    });
};
// Hooks
// After save
reviewSchema.post("save", function (doc) {
    const ReviewModel = this.constructor;
    ReviewModel.getAverageRating(doc.product);
});
// After deleteOne (document middleware)
reviewSchema.post("deleteOne", { document: true, query: false }, function (doc) {
    const ReviewModel = this.constructor;
    ReviewModel.getAverageRating(doc.product);
});
// After findOneAndDelete (query middleware)
reviewSchema.post("findOneAndDelete", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            const ReviewModel = mongoose_1.default.model("Review");
            ReviewModel.getAverageRating(doc.product);
        }
    });
});
const Review = mongoose_1.default.model("Review", reviewSchema);
exports.default = Review;
