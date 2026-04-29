import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import User from "./user.model";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, role, name } = req.body
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            name,
            email,
            role,
            password: hashedPassword
        });
        const { password, ...userWithoutPassword } = newUser.toObject();
        return res.status(201).json(userWithoutPassword);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar Usuario" });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const Users = await User.findOne({
            email
        })
        if(!Users) return res.status(404).json({ error: 'Usuario nao encontrado'});
        const hashed = await bcrypt.compare(password, Users.password );
        if(!hashed) return res.status(401).json({ error: 'Dados invalidos'});
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const token = jwt.sign({ _id: Users._id, role: Users.role }, process.env.JWT_SECRET as string, { expiresIn: "1d" } );
        return res.json({ token })
    } catch(error) {
    console.error("[loginUser]", error);
    return res.status(500).json({ error: "Erro ao criar Usuario" });
}
}
