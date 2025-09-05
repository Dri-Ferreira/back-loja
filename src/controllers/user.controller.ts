import { RequestHandler } from "express";
import { registerSchema } from "../schemas/register-schema";
import { createUser } from "../services/user.service";

export const registerUser: RequestHandler = async (req, res) => {
    // Lógica para registrar o usuário]
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ error: 'Dados inválidos' });
        return;
    }

    const { name, email, password } = result.data;
    const user = await createUser(name, email, password);
    if (!user) {
        res.status(400).json({ error: 'Erro E-mail já cadastrado' });
        return;
    }

    res.status(201).json({ message: "User registered successfully", user });
}