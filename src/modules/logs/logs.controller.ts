import { Request, Response } from "express";
import Logs from "./logs.model";
import { Types } from "mongoose";

export const createLog = async (
    action: string,
    userId: Types.ObjectId | string,
    ticketId: Types.ObjectId | string,
    details?: string,
    ticketTitle?: string
) => {
    try {
        await Logs.create({
            action,
            userId,
            ticketId,
            details,
            ticketTitle,
        });
    } catch (error) {
        console.error("Erro ao criar log:", error);
    }
};

export const getLogs = async (req: Request, res: Response) => {
    try {
        const logs = await Logs.find()
            .populate("userId", "name email")
            .populate("ticketId", "title")
            .sort({ createdAt: -1 });

        return res.status(200).json(logs);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar logs" });
    }
};