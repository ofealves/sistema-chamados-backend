import { Request, Response } from "express";
import Ticket from "./ticket.model";

export const createTicket = async (req: Request, res: Response) => {
    try {
        const { title, description, priority } = req.body;
        const userId = req.user?._id;
        const ticket = await Ticket.create({ title, description, priority, userId });
        return res.status(201).json(ticket);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar ticket" });
    }
};

export const getTickets = async (_req: Request, res: Response) => {
    try {
        const tickets = await Ticket.find();
        return res.json(tickets);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar tickets" });
    }
};