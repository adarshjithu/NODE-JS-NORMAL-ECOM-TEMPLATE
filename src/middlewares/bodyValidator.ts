import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { BadRequestError, BodyValidator } from "../constants/constants/customErrors";

// multer setup for parsing form-data (keep files in memory until validated)
const upload = multer({ storage: multer.memoryStorage() });

export const bodyValidator = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = BodyValidator(schema, req.body);

        req.body = data;
        next();
    };
};
