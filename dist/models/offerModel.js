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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema
const offerSchema = new mongoose_1.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    applicableCategories: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Category",
        },
    ],
    applicableBrands: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
// Create and export the model
exports.default = mongoose_1.default.model("Offer", offerSchema);
