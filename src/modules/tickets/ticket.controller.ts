import { Request, Response } from "express";
import Ticket from "./ticket.model";

// CRIAR TICKET
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
        return res.status(500).json({
            error: "Erro ao criar ticket",
        });
    }
};

// LISTAR TICKETS
export const getTickets = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        const role = req.user?.role;

        let tickets;

        // ADMIN vê todos os tickets
        if (role === "admin") {
            tickets = await Ticket.find()
                .populate("userId", "name email")
                .sort({
                    createdAt: -1,
                });
        } else {
            // usuário comum vê só os próprios
            tickets = await Ticket.find({ userId } as any)
                .populate("userId", "name email")
                .sort({
                    createdAt: -1,
                });
        }

        return res.status(200).json(tickets);
    } catch (error) {
        return res.status(500).json({
            error: "Erro ao buscar tickets",
        });
    }
};

// BUSCAR TICKET POR ID
export const getTicketById = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        const role = req.user?.role;

        let ticket;

        if (role === "admin") {
            ticket = await Ticket.findOne({
                _id: req.params.id,
            } as any).populate("userId", "name email");
        } else {
            ticket = await Ticket.findOne({
                _id: req.params.id,
                userId,
            } as any).populate("userId", "name email");
        }

        if (!ticket) {
            return res.status(404).json({
                error: "Ticket não encontrado",
            });
        }

        return res.status(200).json(ticket);
    } catch (error) {
        return res.status(500).json({
            error: "Erro ao buscar ticket",
        });
    }
};

// ATUALIZAR TICKET
export const updateTicket = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        const role = req.user?.role;

        const ticketId = req.params.id;
        const { status } = req.body;

        let updated;

        if (role === "admin") {
            updated = await Ticket.updateOne(
                { _id: ticketId } as any,
                { status }
            );
        } else {
            updated = await Ticket.updateOne(
                {
                    _id: ticketId,
                    userId,
                } as any,
                {
                    status,
                }
            );
        }

        if (updated.matchedCount === 0) {
            return res.status(404).json({
                error: "Ticket não encontrado",
            });
        }

        return res.status(200).json({
            message: "Ticket atualizado",
        });
    } catch (error) {
        return res.status(500).json({
            error: "Erro ao atualizar ticket",
        });
    }
};

// DELETAR TICKET
export const deleteTicket = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        const role = req.user?.role;

        const ticketId = req.params.id;

        let deleted;

        if (role === "admin") {
            deleted = await Ticket.deleteOne({
                _id: ticketId,
            } as any);
        } else {
            deleted = await Ticket.deleteOne({
                _id: ticketId,
                userId,
            } as any);
        }

        if (deleted.deletedCount === 0) {
            return res.status(404).json({
                error: "Ticket não encontrado",
            });
        }

        return res.status(200).json({
            message: "Ticket deletado",
        });
    } catch (error) {
        return res.status(500).json({
            error: "Erro ao deletar ticket",
        });
    }
};