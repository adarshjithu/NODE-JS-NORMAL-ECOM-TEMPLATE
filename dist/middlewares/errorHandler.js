"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const multer_1 = __importDefault(require("multer"));
/**
 * Express error handler middleware (TypeScript version)
 */
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    // Mongoose validation error
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((error) => `${error.path}: ${error.message || "Validation error"}`)
            .join(", ");
    }
    // Mongoose cast error (e.g., invalid ObjectId)
    else if (err instanceof mongoose_1.default.Error.CastError) {
        statusCode = 400;
        message = `${err.path}: Invalid value`;
    }
    // MongoDB duplicate key error
    else if (isMongoDuplicateError(err)) {
        const field = Object.keys(err.keyValue)[0];
        statusCode = 400;
        message = `${field}: ${field} already exists`;
    }
    // Zod validation error
    else if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = err.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(", ");
    }
    // Multer error
    else if (err instanceof multer_1.default.MulterError) {
        statusCode = 400;
        if (err.code === "MISSING_FIELD_NAME") {
            message = "Invalid request: expected multipart/form-data with file field";
        }
        else if (err.code === "LIMIT_FILE_SIZE") {
            message = "File too large";
        }
        else {
            message = `Upload error: ${err.message}`;
        }
    }
    // Custom error with status and message
    else if (isErrorWithStatusAndMessage(err)) {
        statusCode = err.status;
        message = err.message;
    }
    console.error("\x1b[31mError:\x1b[0m", message);
    if (statusCode === 500)
        console.log(err);
    res.status(statusCode).json({
        success: false,
        message, // ✅ all errors joined in one string
    });
};
// Type guard helpers
function isMongoDuplicateError(error) {
    return typeof error === "object" && error !== null && "code" in error && error.code === 11000 && "keyValue" in error;
}
function isErrorWithStatusAndMessage(error) {
    return typeof error === "object" && error !== null && "status" in error && "message" in error;
}
exports.default = errorHandler;
