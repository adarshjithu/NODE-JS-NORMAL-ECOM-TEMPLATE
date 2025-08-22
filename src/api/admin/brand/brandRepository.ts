import brandModel, { IBrand } from "../../../models/brandModel";
import { BaseRepository } from "../../../repository/baseRepository";

export class BrandRepository extends BaseRepository<IBrand>{
constructor(){
    super(brandModel)
}


}