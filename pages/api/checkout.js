// Importa a função para inicializar a conexão com o banco de dados MongoDB
import { initMongoose } from "../../lib/mongoose";
// Importa o modelo de Product para interagir com a coleção de produtos no MongoDB
import Product from "../../models/Product";
// Importa o modelo de Order para interagir com a coleção de pedidos no MongoDB
import Order from "../../models/Order";
// Importa e inicializa o cliente Stripe com a chave secreta armazenada em variáveis de ambiente
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Inicializa a conexão com o banco de dados MongoDB
  await initMongoose();

  // Extrai dados do corpo da requisição
  const { email, name, address, city } = req.body;
  // Obtém os IDs dos produtos enviados na requisição e remove duplicatas
  const productsIds = req.body.products.split(',');
  const uniqIds = [...new Set(productsIds)];
  // Busca os produtos no banco de dados com base nos IDs únicos
  const products = await Product.find({ _id: { $in: uniqIds } }).exec();

  let line_items = []; // Array para armazenar os itens da linha para o checkout do Stripe
  let subtotal = 0; // Variável para armazenar o subtotal do pedido

  // Itera sobre os IDs únicos dos produtos
  for (let productId of uniqIds) {
    // Conta a quantidade de cada produto no array de IDs
    const quantity = productsIds.filter(id => id === productId).length;
    // Encontra o produto correspondente no array de produtos retornado pelo banco de dados
    const product = products.find(p => p._id.toString() === productId);
    // Calcula o valor total para este produto (arredondado e convertido para centavos)
    const amount = Math.round(product.price * quantity * 100);
    subtotal += amount; // Adiciona o valor ao subtotal

    // Adiciona o item da linha para o checkout do Stripe
    line_items.push({
      quantity,
      price_data: {
        currency: 'BRL', // Moeda em Real Brasileiro
        product_data: { name: product.name }, // Nome do produto
        unit_amount: amount, // Valor do produto em centavos
      },
    });
  }

  const deliveryPrice = 500; // Preço fixo da entrega em centavos (R$5,00)
  subtotal += deliveryPrice; // Adiciona o preço de entrega ao subtotal

  // Adiciona o preço de entrega como um item separado para o checkout do Stripe
  line_items.push({
    quantity: 1,
    price_data: {
      currency: 'BRL',
      product_data: { name: 'Entrega' }, // Nome do item de entrega
      unit_amount: deliveryPrice, // Valor da entrega em centavos
    },
  });

  // Cria um novo pedido no banco de dados com os detalhes do pedido
  const order = await Order.create({
    products: line_items,
    name,
    email,
    address,
    city,
    paid: 0, // Define o status de pagamento como não pago
  });

  // Cria uma sessão de checkout no Stripe
const session = await stripe.checkout.sessions.create({
  line_items, // Itens da linha para o checkout
  mode: 'payment', // Modo de pagamento
  customer_email: email, // Email do cliente
  success_url: `${req.headers.origin}/payment-status?status=success`, // URL de sucesso após o pagamento
  cancel_url: `${req.headers.origin}/payment-status?status=canceled`, // URL de cancelamento se o pagamento falhar
  metadata: { orderId: order._id.toString() }, // Metadados com o ID do pedido
});

  // Redireciona o cliente para a URL da sessão de checkout do Stripe
  res.redirect(303, session.url);
}
