import { initMongoose } from "../../../lib/mongoose"; // Importa a função para inicializar a conexão com o MongoDB.
import Product from "../../../models/Product"; // Modelo de Produto.
import mongoose from "mongoose";

export default async function handle(req, res) {
  await initMongoose(); // Conecta ao banco de dados MongoDB.

  if (req.method === 'PUT') {
    try {
      const { id, name, category, description, ingredients, price, picture } = req.body;

      // Atualiza o produto com base no ID
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, category, description, ingredients, price, picture },
        { new: true, runValidators: true }
      );

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  } 
  
  else if (req.method === 'DELETE') {
    const { id } = req.query; // Extrai o ID dos parâmetros da rota
    
    try {
      if (!id) {
        return res.status(400).json({ error: 'ID do produto não fornecido' });
      }
      
      // Verifique se o ID é um ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }
  
      const objectId = mongoose.Types.ObjectId(id);
  
      // Remove o produto com base no ID
      const result = await Product.findByIdAndDelete(objectId);
      console.log('ID do produto deletado:', objectId, 'Resultado:', result);
  
      if (!result) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
  
      res.status(200).json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
