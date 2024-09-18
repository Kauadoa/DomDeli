import {initMongoose} from "../../lib/mongoose"; // Importa a função para inicializar a conexão com o MongoDB.
import Order from "../../models/Order"; // Modelo de Pedido.
import {buffer} from 'micro'; // Importa a função buffer para ler o corpo da requisição.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Inicializa a biblioteca Stripe com a chave secreta.

// localhost:3000/api/webhook
export default async function handler(req, res) {
  await initMongoose(); // Conecta ao banco de dados MongoDB.
  const signingSecret = 'whsec_634d3142fd2755bd61adaef74ce0504bd2044848c8aac301ffdb56339a0ca78d'; // Chave secreta do webhook.
  const payload = await buffer(req); // Lê o corpo da requisição.
  const signature = req.headers['stripe-signature']; // Obtém a assinatura do Stripe.
  const event = stripe.webhooks.constructEvent(payload, signature, signingSecret); // Constrói o evento a partir do payload e da assinatura.

  if (event?.type === 'checkout.session.completed') {
    // Verifica se o tipo de evento é 'checkout.session.completed'.
    const metadata = event.data?.object?.metadata;
    const paymentStatus = event.data?.object?.payment_status;
    if (metadata?.orderId && paymentStatus === 'paid') {
      // Se o pedido foi pago, atualiza o status do pedido no banco de dados.
      await Order.findByIdAndUpdate(metadata.orderId, {paid:1});
    }
  }

  res.json('ok'); // Retorna uma resposta de sucesso.
}

export const config = {
  api: {
    bodyParser: false, // Desativa o bodyParser padrão para que o payload possa ser lido como buffer.
  }
};
