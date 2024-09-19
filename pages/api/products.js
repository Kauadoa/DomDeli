import {initMongoose} from "../../lib/mongoose"; // Importa a função para inicializar a conexão com o MongoDB.
import Product from "../../models/Product"; // Modelo de Produto.

export async function findAllProducts() {
  return Product.find().exec(); // Função que retorna todos os produtos do banco de dados.
}

export default async function handle(req, res) {
  await initMongoose(); // Conecta ao banco de dados MongoDB.
  const {ids} = req.query; // Extrai os IDs da query string.
  if (ids) {
    const idsArray = ids.split(','); // Converte a string de IDs em um array.
    res.json(
      await Product.find({
        '_id':{$in:idsArray} // Busca produtos com base nos IDs fornecidos.
      }).exec()
    );
  } else {
    res.json( await findAllProducts() ); // Se nenhum ID for fornecido, retorna todos os produtos.
  }
  // pages/api/products.js

  if (req.method === 'POST') {
    try {
      // Inicializa a conexão com o banco de dados
      await initMongoose();

      // Cria um novo produto com os dados recebidos
      const { name, category, description, ingredients, price, picture } = req.body;
      const newProduct = new Product({
        name,
        category,
        description,
        ingredients,
        price,
        picture,
      });

      // Salva o produto no banco de dados
      const savedProduct = await newProduct.save();

      // Retorna a resposta com o produto salvo
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
