// Importa os hooks useContext e useRouter do React e o componente Image do Next.js
import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";
import { useRouter } from "next/router";

export default function Product({_id, category, name, ingredients, price, description, picture}) {
  // Acessa o estado global dos produtos selecionados através do contexto ProductsContext
  const { setSelectedProducts } = useContext(ProductsContext);
  // Inicializa o roteamento do Next.js para redirecionamentos
  const router = useRouter();

  // Função para adicionar o produto ao carrinho
  function addProduct(e) {
    e.stopPropagation(); // Impede o redirecionamento ao clicar no botão
    setSelectedProducts(prev => [...prev, _id]); // Adiciona o produto ao estado de produtos selecionados
  }

  // Função para redirecionar à página de detalhes do produto
  function goToProductPage() {
    router.push(`/product/${_id}`); // Redireciona para a página do produto com base no _id
  }

  // Função para truncar o texto (limitar o comprimento)
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'; // Trunca o texto e adiciona "..." se exceder o limite
    }
    return text;
  }

  // Função para formatar os ingredientes
  function formatIngredients(ingredients) {
    if (ingredients.length > 5) {
      return ingredients.slice(0, 5).concat('... mais');
    }
    return ingredients;
  }

  return (
    <div className="w-52 text-center cursor-pointer">
      {/* Imagem do produto; ao clicar, redireciona para a página do produto */}
      <div className="bg-blue-100 p-5 rounded-xl" onClick={goToProductPage}>
        <img src={picture} alt={name} />
      </div>
      <div className="mt-2" onClick={goToProductPage}>
        <h3 className="font-bold text-center text-lg">
          {truncateText(name, 16)} {/* Truncando o nome do produto */}
        </h3>
      </div>
      <h4 className="text-gray-600 text-center mt-2">
  {ingredients && ingredients.length > 0 ? (
    <ul className="list-disc list-inside">
      {formatIngredients(ingredients).map((ingredient, index) => (
        <li key={ingredient + index}>{ingredient}</li>  // Usando `ingredient + index` para garantir que cada chave seja única
      ))}
    </ul>
  ) : (
    <span>Sem ingredientes</span>
  )}
</h4>

      <div className="flex mt-1">
        <div className="text-2xl font-bold grow">R${price}</div>
        {/* Botão para adicionar o produto ao carrinho */}
        <button onClick={addProduct} className="bg-orange-400 text-white py-1 px-3 rounded-xl">
          +
        </button>
      </div>
    </div>
  );
}