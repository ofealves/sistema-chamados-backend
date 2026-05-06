import { Request, Response } from "express";
import Ticket from "./ticket.model";

export const createTicket = async (req: Request, res: Response) => {
    try {
        const { title, description, priority } = req.body;
        const userId = req.user?._id;

        const ticket = await Ticket.create({
            title,
            description,
            priority,
            userId,
        });

        return res.status(201).json(ticket);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar ticket" });
    }
};

export const getTickets = async (_req: Request, res: Response) => {
    try {
        const tickets = await Ticket.find().sort({ createdAt: -1 });
        return res.json(tickets);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar tickets" });
    }
};

export const getTicketById = async (req: Request, res: Response) => {
    try {
        console.log("🔥 bateu no getTicketById");
        console.log("ID:", req.params.id);

        const ticket = await Ticket.findOne({ _id: req.params.id } as any);

        console.log("RESULT:", ticket);

        if (!ticket) {
            return res.status(404).json({ error: "Ticket não encontrado" });
        }

        return res.status(200).json(ticket);
    } catch (error) {
        console.log("ERRO REAL:", error);
        return res.status(500).json({ error: "Erro ao buscar ticket" });
    }
};



export const updateTicket = async (req: Request, res: Response) => {
    try {
        const TicketId = req.params.id;
        const { status } = req.body;

        const updated = await Ticket.updateOne(
            { _id: TicketId },
            { status }
        );

        if (updated.matchedCount === 0) {
            return res.status(404).json({ error: "Ticket não encontrado" });
        }

        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar documento" });
    }
};

export const deleteTicket = async (req: Request, res: Response) => {
    try {
        const TicketId = req.params.id;

        const deleted = await Ticket.deleteOne({ _id: TicketId });

        if (deleted.deletedCount === 0) {
            return res.status(404).json({ error: "Ticket não encontrado" });
        }

        return res.status(200).json({ message: "Ticket deletado" });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao deletar documento" });
    }
};