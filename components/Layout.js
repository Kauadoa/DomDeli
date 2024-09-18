// Importa os componentes e hooks necessários
import Header from "./Header";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";

export default function Layout({ children }) {
  const { setSelectedProducts } = useContext(ProductsContext); // Acessa o contexto de produtos
  const [success, setSuccess] = useState(false); // Estado para verificar se a compra foi bem-sucedida
  const [darkMode, setDarkMode] = useState(false); // Estado para gerenciar o modo escuro

  useEffect(() => {
    // Verifica se a URL contém 'success', indicando que a compra foi concluída
    if (window.location.href.includes('success')) {
      setSelectedProducts([]); // Limpa o carrinho
      setSuccess(true); // Define o estado de sucesso
    }
    // Verifica no local storage se o modo escuro está ativado
    if (localStorage.getItem('darkMode') === 'true') {
      setDarkMode(true); // Ativa o modo escuro
      document.body.classList.add('dark'); // Adiciona a classe dark ao body
    }
  }, [setSelectedProducts]);

  // Função para alternar entre modo claro e escuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Altera o estado do modo escuro
    document.body.classList.toggle('dark'); // Alterna a classe dark no body
    localStorage.setItem('darkMode', !darkMode); // Salva a preferência no local storage
  };

  return (
    <div>
        <Header toggleDarkMode={toggleDarkMode} /> {/* Passa a função de alternar o modo escuro para o Header */}
      <div className="p-5">
        {success && (
          // Exibe uma mensagem de agradecimento se o pedido for concluído com sucesso
          <div className="mb-5 bg-green-400 text-white text-lg p-5 rounded-xl">
            Thanks for your order!
          </div>
        )}
        {children} {/* Renderiza o conteúdo passado como filho */}
      </div>
    </div>
  );
}
