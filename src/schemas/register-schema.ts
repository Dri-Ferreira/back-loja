import z from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
    email: z.email('E-mail inválido'),
    password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
});