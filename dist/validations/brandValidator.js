"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editBrandValidator = exports.createBrandValidator = void 0;
const joi_1 = __importDefault(require("joi"));
// Validator for creating a brand
exports.createBrandValidator = joi_1.default.object({
    name: joi_1.default.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
        "string.empty": "Brand name is required",
        "string.min": "Brand name must be at least 2 characters",
        "string.max": "Brand name cannot exceed 50 characters",
    }),
    logo: joi_1.default.string()
        .uri()
        .optional()
        .messages({
        "string.uri": "Logo must be a valid URL",
    }),
    isActive: joi_1.default.boolean().optional(),
});
// Validator for editing a brand
exports.editBrandValidator = joi_1.default.object({
    name: joi_1.default.string()
        .trim()
        .min(2)
        .max(50)
        .optional()
        .messages({
        "string.min": "Brand name must be at least 2 characters",
        "string.max": "Brand name cannot exceed 50 characters",
    }),
    logo: joi_1.default.string()
        .uri()
        .optional()
        .messages({
        "string.uri": "Logo must be a valid URL",
    }),
    isActive: joi_1.default.boolean().optional(),
});
