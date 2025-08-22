import { NextFunction, Request, Response } from "express";
import { BrandService } from "./brandService";
import { BodyValidator, NotFoundError } from "../../../constants/constants/customErrors";
import { createBrandValidator, editBrandValidator } from "../../../validations/brandValidator";
import { STATUS_CODES } from "../../../constants/constants/statusCodes";
import { validateObjectId } from "../../../utils/token/tokenUtils";
import { UploadSingleImage } from "../../../utils/upload/image/uploadImage";
import { IQueryParams } from "../../../interface/common";
import { queryParamsSchema } from "../../../validations/queryValidator";

export class BrandController {
    constructor(private brandService: BrandService) {}

    //@description: Create new brand data
    //@route POST /admin/brands
    createBrand = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            BodyValidator(createBrandValidator, req.body);
            if (!req.file) throw new NotFoundError("Image is required");
            const image = await UploadSingleImage(req.file as Express.Multer.File);
            if (!image) {
                throw new NotFoundError("Image not found");
            }
           

            const result = await this.brandService.createBrand({ logo: image, ...req.body });
            res.status(STATUS_CODES.CREATED).json({ success: true, message: "New brand successfully created", data: result });
        } catch (error) {
            next(error);
        }
    };
    //@description: Update new brand data
    //@route PUT /admin/brands/:brandId
    updateBrand = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { brandId } = req?.params;
            if (!validateObjectId(brandId)) {
                throw new NotFoundError("Invalid brand Id");
            }
            BodyValidator(editBrandValidator, req.body);

            const image = req?.file ? await UploadSingleImage(req?.file) : "";

            const result = await this.brandService.updateBrand(brandId, req.body, image || "");
            res.status(STATUS_CODES.OK).json({ success: true, message: " Brand successfully updated", data: result });
        } catch (error) {
            next(error);
        }
    };

    //@description: Delete brand
    //@route PUT /admin/brands/:brandId
    deleteBrand = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { brandId } = req?.params;
            if (!validateObjectId(brandId)) {
                throw new NotFoundError("Invalid brand Id");
            }

            const result = await this.brandService.deleteBrand(brandId as string);
            res.status(STATUS_CODES.OK).json({ success: true, message: "Brand successfull deleted", data: result });
        } catch (error) {
            next(error);
        }
    };
    //@description: Get all brand list
    //@route PUT /admin/brands/:brandId
    getAllBrands = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            queryParamsSchema.parse(req.query);
            const result = await this.brandService.getAllBrands(req?.query as IQueryParams);
            res.status(STATUS_CODES.OK).json({ success: true, message: "Brands fetched successfully", data: result });
        } catch (error) {
            next(error);
        }
    };
    //@description: Get single brand details
    //@route GET /admin/brands/:brandId
    getBrandById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { brandId } = req?.params;
            if (!validateObjectId(brandId)) {
                throw new NotFoundError("Invalid brand Id");
            }
            const result = await this.brandService.getBrandById(brandId);
            res.status(STATUS_CODES.OK).json({ success: true, message: "Brands fetched successfully", data: result });
        } catch (error) {
            next(error);
        }
    };
}
