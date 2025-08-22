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
exports.BrandService = void 0;
const customErrors_1 = require("../../../constants/constants/customErrors");
class BrandService {
    constructor(brandRepository) {
        this.brandRepository = brandRepository;
    }
    createBrand(brandData) {
        return __awaiter(this, void 0, void 0, function* () {
            const brand = yield this.brandRepository.findOne({ name: brandData === null || brandData === void 0 ? void 0 : brandData.name });
            if (brand) {
                throw new customErrors_1.ConflictError("Brand name already taken. Please try other one");
            }
            return yield this.brandRepository.create(brandData);
        });
    }
    updateBrand(brandId, body, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const brand = yield this.brandRepository.findById(brandId);
            if (!brand) {
                throw new customErrors_1.ConflictError("Invalid brand");
            }
            if (brand === null || brand === void 0 ? void 0 : brand.isDeleted)
                throw new customErrors_1.ResourceGoneError("The brand has been deleted ");
            if (image)
                body.logo = image;
            return yield this.brandRepository.update(brandId, body);
        });
    }
    deleteBrand(brandId) {
        return __awaiter(this, void 0, void 0, function* () {
            const brand = yield this.brandRepository.findById(brandId);
            if (!brand) {
                throw new customErrors_1.NotFoundError("Brand not found");
            }
            if (brand.isDeleted) {
                throw new customErrors_1.ConflictError("Brand already deleted");
            }
            brand.isDeleted = true;
            return yield brand.save();
        });
    }
    getAllBrands(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search = "", sortOrder, status, sortedBy, limit = 10, page = 1 } = query;
            const pipeline = [];
            const matchStage = { name: { $regex: search, $options: "i" } };
            if (status == "active")
                matchStage.isActive = true;
            if (status == "inactive")
                matchStage.isActive = false;
            if (status == "deleted")
                matchStage.isDeleted = true;
            pipeline.push({ $match: matchStage });
            // Sorting
            pipeline.push({
                $sort: { [sortedBy || "createdAt"]: sortOrder === "asc" ? 1 : -1 },
            });
            // Pagination
            pipeline.push({
                $skip: (Number(page) - 1) * Number(limit),
            });
            pipeline.push({
                $limit: Number(limit),
            });
            return yield this.brandRepository.aggregate(pipeline);
        });
    }
    getBrandById(brandId) {
        return __awaiter(this, void 0, void 0, function* () {
            const brand = yield this.brandRepository.findById(brandId);
            if (!brand)
                throw new customErrors_1.NotFoundError("Brand not found");
            return brand;
        });
    }
}
exports.BrandService = BrandService;
