import { z } from "zod";

export const cityValidationSchema = z
  .string()
  .min(1, "City name is required")
  .min(2, "City name must contain at least two characters")
  .refine((value) => !/\d/.test(value), "City name cannot contain numbers");
