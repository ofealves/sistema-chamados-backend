import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const request = req.headers.authorization?.split(' ')[1];
    if (!request) return res.status(401).json({ error: "Sem autorizacao" });
    try {
        const token = jwt.verify(request, process.env.JWT_SECRET as string);
        req.user = token as { _id: string; role: string };
        next()
    } catch (error) {
        res.status(401).json({ error: 'sem autorizacao' });
    }
}