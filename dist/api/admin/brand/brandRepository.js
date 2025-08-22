"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandRepository = void 0;
const brandModel_1 = __importDefault(require("../../../models/brandModel"));
const baseRepository_1 = require("../../../repository/baseRepository");
class BrandRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(brandModel_1.default);
    }
}
exports.BrandRepository = BrandRepository;
