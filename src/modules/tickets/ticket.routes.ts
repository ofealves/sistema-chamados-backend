import { Router } from "express";
import { createTicket, getTickets } from "./ticket.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/", auth, createTicket);
router.get("/", auth, getTickets);

export default router;