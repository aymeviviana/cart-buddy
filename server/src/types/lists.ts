import z from "zod";

export const listSchema = z.object({
  name: z
    .string()
    .min(1, { message: "List name must contain at least one character" }),
  items: z.array(
    z.object({
      barcode: z.string(),
      name: z.string(),
      brand: z.string(),
    })
  ),
});