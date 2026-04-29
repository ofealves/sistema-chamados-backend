import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import ticketRoutes from "./modules/tickets/ticket.routes";
import userRoutes from "./modules/users/user.routes";



const app = express();

app.use(cors());
app.use(express.json());
app.use("/tickets", ticketRoutes);
app.use("/auth", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API rodando 🚀" });
});

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

startServer();