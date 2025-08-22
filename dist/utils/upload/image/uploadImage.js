"use strict";
// // middlewares/uploadMiddleware.ts
// import multer from "multer";
// import { Request, Response, NextFunction } from "express";
// import { CloudinaryService } from "../../../services/cloudinaryService";
// import { S3Service } from "../../../services/s3Service";
// import { CLOUD_STORAGE } from "../../../config";
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
exports.UploadSingleImage = void 0;
// // import { S3Service } from "../services/s3Service"; // if needed later
// const storage = multer.memoryStorage(); // keep file in memory
// const upload = multer({ storage });
// const cloudinaryService = new CloudinaryService();
// const s3Service = new S3Service();
// export const uploadSingleImage = (fieldName: string) => {
//     return [
//         upload.single(fieldName),
//         async (req: Request, res: Response, next: NextFunction) => {
//             try {
//                 if (!req.file) return next();
//                 let uploadedUrl: string | null = null;
//                 console.log(CLOUD_STORAGE);
//                 if (CLOUD_STORAGE === "cloudinary") {
//                     uploadedUrl = await cloudinaryService.uploadImage(req.file);
//                 } else if (CLOUD_STORAGE === "s3-bucket") {
//                     uploadedUrl = await s3Service.uploadImage(req.file);
//                 }
//                 if (uploadedUrl) {
//                     (req as any).image = uploadedUrl;
//                 }
//                 next();
//             } catch (error) {
//                 next(error);
//             }
//         },
//     ];
// };
// utils/fileUploader.ts
const cloudinaryService_1 = require("../../../services/cloudinaryService");
const s3Service_1 = require("../../../services/s3Service");
const config_1 = require("../../../config");
const cloudinaryService = new cloudinaryService_1.CloudinaryService();
const s3Service = new s3Service_1.S3Service();
const UploadSingleImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file)
        return null;
    let uploadedUrl = null;
    if (config_1.CLOUD_STORAGE === "cloudinary") {
        uploadedUrl = yield cloudinaryService.uploadImage(file);
    }
    else if (config_1.CLOUD_STORAGE === "s3-bucket") {
        uploadedUrl = yield s3Service.uploadImage(file);
    }
    return uploadedUrl;
});
exports.UploadSingleImage = UploadSingleImage;
