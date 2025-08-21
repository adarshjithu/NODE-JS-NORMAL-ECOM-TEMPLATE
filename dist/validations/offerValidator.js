"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOfferSchema = exports.createOfferSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
// Custom Joi validator for ObjectId
const objectId = joi_1.default.string().custom((value, helpers) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
}, "ObjectId Validation");
// Create Offer Schema
exports.createOfferSchema = joi_1.default.object({
    title: joi_1.default.string()
        .trim()
        .min(1)
        .required()
        .messages({
        "string.base": `"title" must be a string`,
        "string.empty": `"title" cannot be empty`,
        "any.required": `"title" is required`,
    }),
    description: joi_1.default.string().trim().optional().allow("").messages({
        "string.base": `"description" must be a string`,
    }),
    discountType: joi_1.default.string()
        .valid("flat", "percentage")
        .required()
        .messages({
        "any.only": `"discountType" must be one of [flat, percentage]`,
        "any.required": `"discountType" is required`,
    }),
    discountValue: joi_1.default.number().positive().required().messages({
        "number.base": `"discountValue" must be a number`,
        "number.positive": `"discountValue" must be a positive number`,
        "any.required": `"discountValue" is required`,
    }),
    maxDiscountAmount: joi_1.default.number().positive().optional().messages({
        "number.base": `"maxDiscountAmount" must be a number`,
        "number.positive": `"maxDiscountAmount" must be a positive number`,
    }),
    applicableProducts: joi_1.default.array().items(objectId).optional(),
    applicableCategories: joi_1.default.array().items(objectId).optional(),
    applicableBrands: joi_1.default.array().items(objectId).optional(),
    validFrom: joi_1.default.date().required().messages({
        "date.base": `"validFrom" must be a valid date`,
        "any.required": `"validFrom" is required`,
    }),
    validTill: joi_1.default.date()
        .greater(joi_1.default.ref("validFrom"))
        .required()
        .messages({
        "date.base": `"validTill" must be a valid date`,
        "date.greater": `"validTill" must be later than validFrom"`,
        "any.required": `"validTill" is required`,
    }),
    isActive: joi_1.default.boolean().optional(),
    isDeleted: joi_1.default.boolean().optional(),
    createdAt: joi_1.default.date().optional(),
    updatedAt: joi_1.default.date().optional(),
    deletedAt: joi_1.default.date().optional(),
});
// Update Offer Schema
exports.updateOfferSchema = joi_1.default.object({
    title: joi_1.default.string().trim().min(1).optional(),
    description: joi_1.default.string().trim().optional().allow(""),
    discountType: joi_1.default.string().valid("flat", "percentage").optional(),
    discountValue: joi_1.default.number().positive().optional(),
    maxDiscountAmount: joi_1.default.number().positive().optional(),
    applicableProducts: joi_1.default.array().items(objectId).optional(),
    applicableCategories: joi_1.default.array().items(objectId).optional(),
    applicableBrands: joi_1.default.array().items(objectId).optional(),
    validFrom: joi_1.default.date().optional(),
    validTill: joi_1.default.date().greater(joi_1.default.ref("validFrom")).optional(),
    isActive: joi_1.default.boolean().optional(),
    isDeleted: joi_1.default.boolean().optional(),
    updatedAt: joi_1.default.date().optional(),
    deletedAt: joi_1.default.date().optional(),
});
