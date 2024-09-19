import { initMongoose } from "../../lib/mongoose";
import Order from "../../models/Order";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    // Inicializa a conexão com o MongoDB
    await initMongoose();

    // Busca todos os pedidos no banco de dados
    const orders = await Order.find().sort({ createdAt: -1 }).lean();

    // Retorna os pedidos como JSON
    res.status(200).json(orders);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    res.status(500).json({ message: "Erro ao buscar pedidos" });
  }
}
