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

export const deleteTicket = async (req: Request, res: Response) => {
    try {
        const TicketId = req.params.id;
        const result = await Ticket.deleteOne({ _id: TicketId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Ticket não encontrado" });
        }
        return res.status(200).json({ message: "Ticket deletado" });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar documento' })
    }
}

export const updateTicket = async (req: Request, res: Response) => {
    try {
        const TicketId = req.params.id;
        const status = req.body.status;
        const result = await Ticket.updateOne(
            { _id: TicketId },
            { status },
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Ticket não encontrado" });
        }
        return res.status(200).json({ message: "Ticket atualizado" });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar documento' });
    }
}