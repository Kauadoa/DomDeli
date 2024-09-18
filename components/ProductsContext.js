// Importa createContext para criar um contexto e useLocalStorageState para armazenar o estado no local storage
import { createContext } from "react";
import useLocalStorageState from 'use-local-storage-state';

// Cria um contexto para os produtos
export const ProductsContext = createContext({});

// Provedor de contexto que gerencia o estado dos produtos selecionados
export function ProductsContextProvider({ children }) {
  // Utiliza o localStorage para persistir o estado do carrinho
  const [selectedProducts, setSelectedProducts] = useLocalStorageState('selectedProducts', { defaultValue: [] });

  return (
    // Provedor do contexto, passando o estado e a função de atualização para os filhos
    <ProductsContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}
