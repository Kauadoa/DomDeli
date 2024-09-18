// Importa os métodos model, models e Schema do mongoose
import { model, models, Schema } from "mongoose";

// Define o esquema do pedido com os campos e seus tipos
const OrderSchema = new Schema({
  products: Object, // Armazena os produtos do pedido
  name: String, // Nome do cliente
  email: String, // Email do cliente
  address: String, // Endereço do cliente
  city: String, // Cidade do cliente
  paid: { type: Number, defaultValue: 0 }, // Indica se o pedido foi pago, valor inicial 0
}, { timestamps: true }); // Adiciona automaticamente campos de data de criação e atualização

// Exporta o modelo Order, reutilizando se já estiver definido, ou cria um novo
const Order = models?.Order || model('Order', OrderSchema);

export default Order;
