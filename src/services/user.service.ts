import { hash } from "bcryptjs";
import { prisma } from "../libs/prisma";


export const createUser = async (name: string, email: string, password: string) => {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) return null;
    const hashPaswoard = await hash(password, 10);
    const user = await prisma.user.create({
        data:{
            name, 
            email: email.toLowerCase(), 
            password: hashPaswoard
        }
    });
    if(!user) return null;
    return {
        id: user.id,
        name: user.name,
        email: user.email
    }

}