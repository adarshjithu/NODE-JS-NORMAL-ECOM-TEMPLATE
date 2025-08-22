import express from 'express'
import { BrandRepository } from './brandRepository';
import { BrandService } from './brandService';
import { BrandController } from './brandController';
import { adminAuth } from '../../../middlewares/adminAuth';
import multer from 'multer';


const brandRouter = express.Router();
const brandRepository = new BrandRepository();
const brandService =  new BrandService(brandRepository);
const controller = new BrandController(brandService)
const storage = multer.memoryStorage(); // keep file in memory
const upload = multer({ storage });


brandRouter.post("/",adminAuth(),upload.single('image'),controller.createBrand);
brandRouter.put('/:brandId',adminAuth(),upload.single('image'),controller.updateBrand);
brandRouter.get("/:brandId",adminAuth(),controller.getBrandById)
brandRouter.delete("/:brandId",adminAuth(),controller.deleteBrand);
brandRouter.get("/",adminAuth(),controller.getAllBrands)
export default brandRouter;