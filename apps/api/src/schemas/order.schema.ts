import { z } from 'zod';

// Aquí definimos las reglas de seguridad
export const CreateOrderSchema = z.object({
    customerName: z.string().min(2, { message: "El nombre es muy corto (mínimo 2 letras)" }),
    customerPhone: z.string().length(9, { message: "El celular debe tener exactamente 9 dígitos" }),
    items: z.array(
        z.object({
            productId: z.number({ required_error: "El ID del producto es obligatorio" }),
            quantity: z.number().min(1, { message: "La cantidad debe ser al menos 1" })
        })
    ).min(1, { message: "El carrito no puede estar vacío" })
});