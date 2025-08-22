"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
const _1 = require(".");
dotenv_1.default.config();
const s3 = new client_s3_1.S3Client({
    region: _1.AWS_REGION,
    credentials: {
        accessKeyId: _1.AWS_ACCESS_KEY_ID,
        secretAccessKey: _1.AWS_SECRET_ACCESS_KEY,
    },
});
exports.default = s3;
