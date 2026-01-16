import { z } from 'zod';

export const CreateOrderSchema = z.object({
  customerName: z.string().min(2),
  customerPhone: z.string().length(9),
  total: z.number(),
  items: z
    .array(
      z.object({
        productId: z.number(),
        quantity: z.number().min(1),
        price: z.number(), // <--- GUARDA EL PRECIO HISTÓRICO
      }),
    )
    .min(1),
});
