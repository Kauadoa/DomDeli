import { useState } from "react"; // Importa o hook useState do React para gerenciar o estado local do componente.
import Product from "../components/Product"; // Importa o componente Product para exibir produtos individuais.
import { initMongoose } from "../lib/mongoose"; // Importa a função para inicializar a conexão com o banco de dados MongoDB.
import { findAllProducts } from "./api/products"; // Importa a função para buscar todos os produtos do banco de dados.
import Layout from "../components/Layout"; // Importa o componente Layout que envolve o conteúdo da página com a estrutura de layout.
import Slider from "react-slick"; // Importa o componente Slider para exibir produtos em um carrossel.
import Link from "next/link"; // Importa o Link do Next.js para navegação entre páginas.

export default function Home({ products }) {
  // Declara um estado local para o termo de pesquisa.
  const [phrase, setPhrase] = useState('');

  // Filtra os produtos com base na frase de pesquisa.
  const filteredProducts = phrase
    ? products.filter(p => p.name.toLowerCase().includes(phrase.toLowerCase()))
    : products;

  // Obtém nomes únicos das categorias dos produtos filtrados.
  const categoriesNames = [...new Set(filteredProducts.map(p => p.category))];

  // Configurações para o slider/carrossel.
  const settings = {
    dots: false, // Desativa os pontos de navegação no carrossel.
    infinite: true, // Permite rotação infinita do carrossel.
    speed: 500, // Define a velocidade de transição dos slides.
    slidesToShow: 3, // Número de slides visíveis ao mesmo tempo.
    swipeToSlide: true, // Permite navegação por deslizar os slides.
    touchThreshold: 15, // Número de pixels que o usuário precisa deslizar para reconhecer o toque.
    responsive: [
      {
        breakpoint: 1024, // Configurações para dispositivos com largura de 1024px ou menos.
        settings: {
          slidesToShow: 2, // Mostra 2 slides ao mesmo tempo.
          infinite: true, // Permite rotação infinita.
        }
      },
      {
        breakpoint: 600, // Configurações para dispositivos com largura de 600px ou menos.
        settings: {
          slidesToShow: 1, // Mostra 1 slide ao mesmo tempo.
          infinite: true, // Permite rotação infinita.
        }
      }
    ],
  };

  return (
    <Layout>
      {/* Campo de pesquisa para filtrar produtos */}
      <div className="flex items-center mb-4">
        <input 
          value={phrase} 
          onChange={e => setPhrase(e.target.value)} 
          type="text" 
          placeholder="Pesquise os produtos..." 
          className="bg-gray-200 w-full py-2 px-4 rounded-xl"
        />
      </div>

      {/* Imagem/banner principal */}
      <div className="relative mb-8 flex items-center justify-center">
        <img 
          src="/Step Style.png" 
          alt="Banner" 
          className="w-1rem max-w-1rem h-auto object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Seção de produtos filtrados por categorias */}
      <div>
        {categoriesNames.map(categoryName => (
          <div key={categoryName}>
            {/* Exibe apenas se houver produtos na categoria atual */}
            {filteredProducts.find(p => p.category === categoryName) && (
              <div>
                <h2 className="text-2xl py-5 capitalize">{categoryName}</h2>
                <Slider {...settings}>
                  {filteredProducts.filter(p => p.category === categoryName).map(productInfo => (
                    <div key={productInfo._id} className="px-5">
                      {/* Componente Product exibe informações sobre cada produto */}
                      <Product {...productInfo} />
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Rodapé com links para políticas e informações adicionais */}
      <div className="mt-10 p-4 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
        <div className="flex justify-around flex-wrap text-center">
          <Link href="/privacy-policy">
            <a className="hover:text-emerald-500">Política de Privacidade</a>
          </Link>
          <Link href="/regulations">
            <a className="hover:text-emerald-500">Regulamentos</a>
          </Link>
          <Link href="/faq">
            <a className="hover:text-emerald-500">Dúvidas Frequentes</a>
          </Link>
          <Link href="/terms-conditions">
            <a className="hover:text-emerald-500">Termos e Condições</a>
          </Link>
        </div>
        <div className="mt-6 text-sm text-center">
          Os preços, promoções, condições de pagamento, frete e produtos são válidos exclusivamente para compras realizadas via internet.
          Fotos meramente ilustrativas. Copyright © 2003-2024 - step-style.com Todos os direitos reservados. 
          Este site é meramente educacional, criado para fins educativos e demonstração de práticas de programação. 
          SBF COMERCIO DE PRODUTOS ESPORTIVOS S.A. CNPJ: 00.000.000/0000-00.
          Endereço: Cidade de Cataguases - MG, CEP 00000 - 000.
        </div>
      </div>
    </Layout>
  );
}

// Função para obter dados do servidor durante o processo de renderização da página
export async function getServerSideProps() {
  await initMongoose(); // Inicializa a conexão com o MongoDB
  const products = await findAllProducts(); // Busca todos os produtos do banco de dados
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)), // Converte os produtos para JSON para passar como props
    },
  };
}
