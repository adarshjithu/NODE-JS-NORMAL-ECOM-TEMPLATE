import Joi from "joi";
import mongoose from "mongoose";

// Custom Joi validator for ObjectId
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId Validation");

// Create Offer Schema
export const createOfferSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(1)
    .required()
    .messages({
      "string.base": `"title" must be a string`,
      "string.empty": `"title" cannot be empty`,
      "any.required": `"title" is required`,
    }),

  description: Joi.string().trim().optional().allow("").messages({
    "string.base": `"description" must be a string`,
  }),

  discountType: Joi.string()
    .valid("flat", "percentage")
    .required()
    .messages({
      "any.only": `"discountType" must be one of [flat, percentage]`,
      "any.required": `"discountType" is required`,
    }),

  discountValue: Joi.number().positive().required().messages({
    "number.base": `"discountValue" must be a number`,
    "number.positive": `"discountValue" must be a positive number`,
    "any.required": `"discountValue" is required`,
  }),

  maxDiscountAmount: Joi.number().positive().optional().messages({
    "number.base": `"maxDiscountAmount" must be a number`,
    "number.positive": `"maxDiscountAmount" must be a positive number`,
  }),

  applicableProducts: Joi.array().items(objectId).optional(),

  applicableCategories: Joi.array().items(objectId).optional(),

  applicableBrands: Joi.array().items(objectId).optional(),

  validFrom: Joi.date().required().messages({
    "date.base": `"validFrom" must be a valid date`,
    "any.required": `"validFrom" is required`,
  }),

  validTill: Joi.date()
    .greater(Joi.ref("validFrom"))
    .required()
    .messages({
      "date.base": `"validTill" must be a valid date`,
      "date.greater": `"validTill" must be later than validFrom"`,
      "any.required": `"validTill" is required`,
    }),

  isActive: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
  deletedAt: Joi.date().optional(),
});

// Update Offer Schema
export const updateOfferSchema = Joi.object({
  title: Joi.string().trim().min(1).optional(),
  description: Joi.string().trim().optional().allow(""),
  discountType: Joi.string().valid("flat", "percentage").optional(),
  discountValue: Joi.number().positive().optional(),
  maxDiscountAmount: Joi.number().positive().optional(),
  applicableProducts: Joi.array().items(objectId).optional(),
  applicableCategories: Joi.array().items(objectId).optional(),
  applicableBrands: Joi.array().items(objectId).optional(),
  validFrom: Joi.date().optional(),
  validTill: Joi.date().greater(Joi.ref("validFrom")).optional(),
  isActive: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
  updatedAt: Joi.date().optional(),
  deletedAt: Joi.date().optional(),
});
