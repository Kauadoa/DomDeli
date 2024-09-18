import { useRouter } from "next/router";
import { connectToDatabase } from "../lib/mongodb"; // Atualize para a nova conexão com MongoDB
import Product from "../../models/Product";
import Layout from "../../components/Layout";

// Página de produto individual
export default function ProductPage({ product }) {
  const router = useRouter(); // Hook do Next.js para acessar informações da rota

  // Verifica se o produto foi encontrado
  if (!product) return <p>Produto não encontrado</p>;

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <img src={product.picture} alt={product.name} className="w-64 h-64 object-contain" /> {/* Imagem do produto */}
        <h1 className="text-3xl font-bold mt-4">{product.name}</h1> {/* Nome do produto */}
        <p className="text-gray-600 text-center mt-2">{product.description}</p> {/* Descrição do produto */}
        <div className="text-2xl font-bold mt-4">R${product.price}</div> {/* Preço do produto */}
      </div>
    </Layout>
  );
}

// Função que obtém os dados do produto com base no ID da rota
export async function getServerSideProps(context) {
  const { id } = context.params; // Obtém o ID da URL
  await connectToDatabase(); // Inicializa a conexão com o MongoDB
  const product = await Product.findById(id).lean(); // Busca o produto no banco de dados pelo ID

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)), // Converte o produto para JSON para passar como props
    },
  };
}
