import { Router } from "express";
import {
    createTicket,
    deleteTicket,
    getTicketById,
    getTickets,
    updateTicket,
} from "./ticket.controller";
import { auth } from "../../middleware/auth";
import { adminAuth } from "../../middleware/adminAuth";

const router = Router();

router.post("/", auth, createTicket);
router.get("/", auth, getTickets);
router.get("/:id", auth, getTicketById); // ✅ CORRETO
router.patch("/:id", auth, adminAuth, updateTicket);
router.delete("/:id", auth, adminAuth, deleteTicket);

export default router;