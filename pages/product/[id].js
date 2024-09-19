import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { initMongoose } from "../../lib/mongoose";
import Product from "../../models/Product";
import Layout from "../../components/Layout";
import { ProductsContext } from "../../components/ProductsContext"; // Importa o contexto do carrinho

// Página de produto individual
export default function ProductPage({ product }) {
  const router = useRouter(); // Hook do Next.js para acessar informações da rota
  const { setSelectedProducts } = useContext(ProductsContext); // Acessa o contexto do carrinho
  const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
  const [isClient, setIsClient] = useState(false); // Estado para verificar se o código está sendo executado no cliente

  // useEffect para garantir que o código seja executado apenas no cliente
  useEffect(() => {
    setIsClient(true); // Marca que estamos no cliente
  }, []);

  // Verifica se o produto foi encontrado
  if (!product) return <p>Produto não encontrado</p>;

  // Função para adicionar o produto ao carrinho e exibir o modal
  function addProduct(e) {
    e.preventDefault(); // Evita o comportamento padrão de navegação
    setSelectedProducts(prev => [...prev, product._id]); // Adiciona o produto ao estado de produtos selecionados
    setShowModal(true); // Exibe o modal de confirmação
  }

  // Função para redirecionar à página inicial
  function goToHomePage() {
    setShowModal(false); // Fecha o modal
    router.push('/'); // Redireciona para a página inicial
  }

  // Função para redirecionar ao carrinho
  function goToCartPage() {
    setShowModal(false); // Fecha o modal
    router.push('/cart'); // Redireciona para a página do carrinho
  }

  return (
    <Layout>
      <div className="flex flex-col items-center">
        {/* Imagem do produto */}
        <img src={product.picture} alt={product.name} className="w-64 h-64 object-contain" />

        {/* Nome do produto */}
        <h1 className="text-3xl font-bold mt-4">{product.name}</h1>

        {/* Descrição do produto */}
        <p className="text-gray-600 text-center mt-2">{product.description}</p>

        {/* Lista de ingredientes, se houver */}
        <p className="text-gray-600 text-center mt-2">
          {product.ingredients && product.ingredients.length > 0 ? (
            <ul className="list-disc list-inside">
              {product.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          ) : (
            <p>Sem ingredientes</p>
          )}
        </p>

        {/* Preço do produto */}
        <div className="text-2xl font-bold mt-4">R${product.price}</div>

        {/* Botão para adicionar ao carrinho */}
        <button
          onClick={addProduct}
          className="bg-emerald-400 text-white py-2 px-4 rounded-xl mt-4"
        >
          Adicionar ao Carrinho
        </button>

        {/* Modal de confirmação (somente renderizado no cliente) */}
        {isClient && showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Produto adicionado ao carrinho!</h2>
              <p className="mb-4">O que deseja fazer a seguir?</p>
              <div className="flex justify-around">
                <button
                  onClick={goToHomePage}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Continuar Comprando
                </button>
                <button
                  onClick={goToCartPage}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg"
                >
                  Revisar Carrinho
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

// Função que obtém os dados do produto com base no ID da rota
export async function getServerSideProps(context) {
  const { id } = context.params; // Obtém o ID da URL
  await initMongoose(); // Inicializa a conexão com o MongoDB
  const product = await Product.findById(id).lean(); // Busca o produto no banco de dados pelo ID

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)), // Converte o produto para JSON para passar como props
    },
  };
}
