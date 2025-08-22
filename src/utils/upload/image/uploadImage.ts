// // middlewares/uploadMiddleware.ts
// import multer from "multer";
// import { Request, Response, NextFunction } from "express";
// import { CloudinaryService } from "../../../services/cloudinaryService";
// import { S3Service } from "../../../services/s3Service";
// import { CLOUD_STORAGE } from "../../../config";

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
import { CloudinaryService } from "../../../services/cloudinaryService";
import { S3Service } from "../../../services/s3Service";
import { CLOUD_STORAGE } from "../../../config";

const cloudinaryService = new CloudinaryService();
const s3Service = new S3Service();

export const UploadSingleImage = async (file: Express.Multer.File): Promise<string | null> => {
  if (!file) return null;

  let uploadedUrl: string | null = null;

  if (CLOUD_STORAGE === "cloudinary") {
    uploadedUrl = await cloudinaryService.uploadImage(file);
  } else if (CLOUD_STORAGE === "s3-bucket") {
    uploadedUrl = await s3Service.uploadImage(file);
  }

  return uploadedUrl;
};
