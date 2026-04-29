import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);

    console.log("🟢 MongoDB conectado com sucesso");
  } catch (error) {
    console.log("🔴 Erro ao conectar no MongoDB", error);
    process.exit(1);
  }
};