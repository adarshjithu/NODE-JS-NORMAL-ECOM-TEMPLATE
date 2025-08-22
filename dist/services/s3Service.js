"use strict";
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
exports.S3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
class S3Service {
    constructor() {
        this.bucketName = process.env.AWS_BUCKET_NAME;
        this.region = process.env.AWS_REGION;
        this.s3 = new client_s3_1.S3Client({
            region: this.region,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }
    uploadImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = `uploads/${(0, uuid_1.v4)()}-${file.originalname}`;
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            });
            yield this.s3.send(command);
            return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
        });
    }
}
exports.S3Service = S3Service;
