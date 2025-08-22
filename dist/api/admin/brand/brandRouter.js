"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brandRepository_1 = require("./brandRepository");
const brandService_1 = require("./brandService");
const brandController_1 = require("./brandController");
const adminAuth_1 = require("../../../middlewares/adminAuth");
const multer_1 = __importDefault(require("multer"));
const brandRouter = express_1.default.Router();
const brandRepository = new brandRepository_1.BrandRepository();
const brandService = new brandService_1.BrandService(brandRepository);
const controller = new brandController_1.BrandController(brandService);
const storage = multer_1.default.memoryStorage(); // keep file in memory
const upload = (0, multer_1.default)({ storage });
brandRouter.post("/", (0, adminAuth_1.adminAuth)(), upload.single('image'), controller.createBrand);
brandRouter.put('/:brandId', (0, adminAuth_1.adminAuth)(), upload.single('image'), controller.updateBrand);
brandRouter.get("/:brandId", (0, adminAuth_1.adminAuth)(), controller.getBrandById);
brandRouter.delete("/:brandId", (0, adminAuth_1.adminAuth)(), controller.deleteBrand);
brandRouter.get("/", (0, adminAuth_1.adminAuth)(), controller.getAllBrands);
exports.default = brandRouter;
