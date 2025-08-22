"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryParamsSchema = void 0;
const zod_1 = require("zod");
exports.queryParamsSchema = zod_1.z.object({
    search: zod_1.z.string().optional(),
    page: zod_1.z.string().optional(),
    limit: zod_1.z.string().optional(),
    sortOrder: zod_1.z.string().optional(),
    sortedBy: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
});
