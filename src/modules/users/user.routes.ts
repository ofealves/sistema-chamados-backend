import { Router } from "express";
import { createUser, loginUser } from "./user.controller";
import Ticket from "../tickets/ticket.model";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/tickets/demo", async (req, res) => {
    const tickets = await Ticket.find()
        .select("title description status priority createdAt updatedAt")
        .lean();

    res.json(tickets);
});

export default router;