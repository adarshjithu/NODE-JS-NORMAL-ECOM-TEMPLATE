import { ConflictError, NotFoundError, ResourceGoneError } from "../../../constants/constants/customErrors";
import { IQueryParams } from "../../../interface/common";
import { IBrand } from "../../../models/brandModel";
import { BrandRepository } from "./brandRepository";

export class BrandService {
    constructor(private brandRepository: BrandRepository) {}

    async createBrand(brandData: IBrand): Promise<IBrand | null> {
        const brand = await this.brandRepository.findOne({ name: brandData?.name });
        if (brand) {
            throw new ConflictError("Brand name already taken. Please try other one");
        }

        return await this.brandRepository.create(brandData);
    }

    async updateBrand(brandId: string, body: IBrand, image: string): Promise<IBrand | null> {
        const brand = await this.brandRepository.findById(brandId);
        if (!brand) {
            throw new ConflictError("Invalid brand");
        }

        if (brand?.isDeleted) throw new ResourceGoneError("The brand has been deleted ");
        if (image) body.logo = image;

        return await this.brandRepository.update(brandId, body);
    }

    async deleteBrand(brandId: string): Promise<IBrand | null> {
        const brand = await this.brandRepository.findById(brandId);
        if (!brand) {
            throw new NotFoundError("Brand not found");
        }
        if (brand.isDeleted) {
            throw new ConflictError("Brand already deleted");
        }

        brand.isDeleted = true;

        return await brand.save();
    }

    async getAllBrands(query: IQueryParams): Promise<IBrand[] | null> {
        const { search = "", sortOrder, status, sortedBy, limit = 10, page = 1 } = query;

        const pipeline: any = [];
        const matchStage: any = { name: { $regex: search, $options: "i" } };
        if (status == "active") matchStage.isActive = true;
        if (status == "inactive") matchStage.isActive = false;
        if (status == "deleted") matchStage.isDeleted = true;
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

        return await this.brandRepository.aggregate(pipeline);
    }

    async getBrandById(brandId: string): Promise<IBrand | null> {
        const brand = await this.brandRepository.findById(brandId);
        if (!brand) throw new NotFoundError("Brand not found");
        return brand;
    }
}
