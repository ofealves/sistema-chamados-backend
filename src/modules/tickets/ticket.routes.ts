import { Router } from "express";
import {
    createTicket,
    deleteTicket,
    getTicketById,
    getTickets,
    updateTicket,
} from "./ticket.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/", auth, createTicket);
router.get("/", auth, getTickets);
router.get("/:id", auth, getTicketById); // ✅ CORRETO
router.patch("/:id", auth, updateTicket);
router.delete("/:id", auth, deleteTicket);

export default router;