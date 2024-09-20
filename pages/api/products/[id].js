import { initMongoose } from "../../../lib/mongoose";
import Product from "../../../models/Product";
import mongoose from "mongoose";
import formidable from "formidable"; // Certifique-se de importar o formidable
import path from "path"; // Certifique-se de importar o path
export const config = {
  api: {
    bodyParser: false, // Desativa o body parser padrão
  },
};
export default async function handle(req, res) {
  await initMongoose();

  if (req.method === 'PUT') {
    const { id } = req.query;

    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public', 'products'),
      keepExtensions: true,
      filename: (name, ext, part) => part.originalFilename,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Erro ao processar o formulário', err);
        return res.status(500).json({ error: 'Erro ao processar o formulário' });
      }

      const { name, category, description, price } = fields;
      const ingredients = fields.ingredients ? JSON.parse(fields.ingredients) : []; // Adicionada verificação

      const picture = files.image && files.image.originalFilename
        ? `/products/${files.image.originalFilename}`
        : fields.picture;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const nameString = typeof name === 'string' ? name : String(name);
      const priceString = typeof price === 'number' ? price : String(price);
      const categoryString = typeof category === 'string' ? category : String(category);
      const descriptionString = typeof description === 'string' ? description : String(description);
      const pictureString = typeof picture === 'string' ? picture : String(picture);
      const objectId = mongoose.Types.ObjectId(String(id));

      try {
        const updatedProduct = await Product.findOneAndUpdate(
          { _id: objectId },
          {
            name: nameString,
            category: categoryString,
            description: descriptionString,
            ingredients,
            price: priceString,
            picture: pictureString,
          },
          { new: true, runValidators: true }
        );

        res.status(200).json(updatedProduct);
      } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ error: 'Falha ao atualizar o produto' });
      }
    });
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
  
      if (!result) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
  
      res.status(200).json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }  else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
