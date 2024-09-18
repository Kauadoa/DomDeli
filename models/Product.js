// Importa os métodos model, models e Schema do mongoose
import { model, models, Schema } from "mongoose";

// Define o esquema do produto com os campos e seus tipos
const ProductSchema = new Schema({
  name: String, // Nome do produto
  description: String, // Descrição do produto
  price: Number, // Preço do produto
  category: String, // Categoria do produto
  picture: String, // URL da imagem do produto
});

// Exporta o modelo Product, reutilizando se já estiver definido, ou cria um novo
const Product = models?.Product || model('Product', ProductSchema);

export default Product;
