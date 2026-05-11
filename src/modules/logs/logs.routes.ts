import { Router } from "express";
import { getLogs } from "./logs.controller";
import { auth } from "../../middleware/auth";
import { adminAuth } from "../../middleware/adminAuth";

const router = Router();

router.get("/", auth, adminAuth, getLogs);

export default router;