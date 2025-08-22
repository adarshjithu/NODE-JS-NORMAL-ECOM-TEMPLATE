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
exports.BrandController = void 0;
const customErrors_1 = require("../../../constants/constants/customErrors");
const brandValidator_1 = require("../../../validations/brandValidator");
const statusCodes_1 = require("../../../constants/constants/statusCodes");
const tokenUtils_1 = require("../../../utils/token/tokenUtils");
const uploadImage_1 = require("../../../utils/upload/image/uploadImage");
const queryValidator_1 = require("../../../validations/queryValidator");
class BrandController {
    constructor(brandService) {
        this.brandService = brandService;
        //@description: Create new brand data
        //@route POST /admin/brands
        this.createBrand = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, customErrors_1.BodyValidator)(brandValidator_1.createBrandValidator, req.body);
                if (!req.file)
                    throw new customErrors_1.NotFoundError("Image is required");
                const image = yield (0, uploadImage_1.UploadSingleImage)(req.file);
                if (!image) {
                    throw new customErrors_1.NotFoundError("Image not found");
                }
                const result = yield this.brandService.createBrand(Object.assign({ logo: image }, req.body));
                res.status(statusCodes_1.STATUS_CODES.CREATED).json({ success: true, message: "New brand successfully created", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        //@description: Update new brand data
        //@route PUT /admin/brands/:brandId
        this.updateBrand = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { brandId } = req === null || req === void 0 ? void 0 : req.params;
                if (!(0, tokenUtils_1.validateObjectId)(brandId)) {
                    throw new customErrors_1.NotFoundError("Invalid brand Id");
                }
                (0, customErrors_1.BodyValidator)(brandValidator_1.editBrandValidator, req.body);
                const image = (req === null || req === void 0 ? void 0 : req.file) ? yield (0, uploadImage_1.UploadSingleImage)(req === null || req === void 0 ? void 0 : req.file) : "";
                const result = yield this.brandService.updateBrand(brandId, req.body, image || "");
                res.status(statusCodes_1.STATUS_CODES.OK).json({ success: true, message: " Brand successfully updated", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        //@description: Delete brand
        //@route PUT /admin/brands/:brandId
        this.deleteBrand = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { brandId } = req === null || req === void 0 ? void 0 : req.params;
                if (!(0, tokenUtils_1.validateObjectId)(brandId)) {
                    throw new customErrors_1.NotFoundError("Invalid brand Id");
                }
                const result = yield this.brandService.deleteBrand(brandId);
                res.status(statusCodes_1.STATUS_CODES.OK).json({ success: true, message: "Brand successfull deleted", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        //@description: Get all brand list
        //@route PUT /admin/brands/:brandId
        this.getAllBrands = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                queryValidator_1.queryParamsSchema.parse(req.query);
                const result = yield this.brandService.getAllBrands(req === null || req === void 0 ? void 0 : req.query);
                res.status(statusCodes_1.STATUS_CODES.OK).json({ success: true, message: "Brands fetched successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        //@description: Get single brand details
        //@route GET /admin/brands/:brandId
        this.getBrandById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { brandId } = req === null || req === void 0 ? void 0 : req.params;
                if (!(0, tokenUtils_1.validateObjectId)(brandId)) {
                    throw new customErrors_1.NotFoundError("Invalid brand Id");
                }
                const result = yield this.brandService.getBrandById(brandId);
                res.status(statusCodes_1.STATUS_CODES.OK).json({ success: true, message: "Brands fetched successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.BrandController = BrandController;
