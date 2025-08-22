import { z } from "zod";

export const queryParamsSchema = z.object({
  search: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
  sortOrder: z.string().optional(),
  sortedBy: z.string().optional(),
  status: z.string().optional(),
});


