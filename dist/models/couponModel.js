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
const couponSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },
    description: { type: String },
    discountType: {
        type: String,
        enum: ["percentage", "flat"],
        required: true,
    },
    discountValue: { type: Number, required: true },
    maxDiscountAmount: { type: Number },
    minCartValue: { type: Number, default: 0 },
    usageLimit: {
        total: { type: Number },
        perUser: { type: Number },
    },
    firstOrderOnly: { type: Boolean, default: false },
    validFrom: { type: Date, default: Date.now },
    validTill: { type: Date, required: true },
    applicableCategories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Category" }],
    applicableProducts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Product" }],
    applicableBrands: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Brand" }],
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});
exports.default = mongoose_1.default.model("Coupon", couponSchema);
