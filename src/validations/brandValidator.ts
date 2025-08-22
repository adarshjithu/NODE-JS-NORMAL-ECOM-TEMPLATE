import Joi from "joi";

// Validator for creating a brand
export const createBrandValidator = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Brand name is required",
      "string.min": "Brand name must be at least 2 characters",
      "string.max": "Brand name cannot exceed 50 characters",
    }),

  logo: Joi.string()
    .uri()
    .optional()
    .messages({
      "string.uri": "Logo must be a valid URL",
    }),

  isActive: Joi.boolean().optional(),
});



// Validator for editing a brand
export const editBrandValidator = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .optional()
    .messages({
      "string.min": "Brand name must be at least 2 characters",
      "string.max": "Brand name cannot exceed 50 characters",
    }),

  logo: Joi.string()
    .uri()
    .optional()
    .messages({
      "string.uri": "Logo must be a valid URL",
    }),

  isActive: Joi.boolean().optional(),
});
