import { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext(); // Criação do contexto para o modo escuro.

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false); // Estado inicial do modo escuro, definido como falso (modo claro).

  useEffect(() => {
    // Quando o componente é montado, verifica se o modo escuro está salvo no localStorage.
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode); // Define o estado do modo escuro conforme a preferência salva.
    document.documentElement.classList.toggle("dark", savedMode); // Adiciona ou remove a classe 'dark' no elemento raiz (HTML) para aplicar o modo escuro.
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode; // Inverte o estado do modo escuro.
    setDarkMode(newMode); // Atualiza o estado do modo escuro.
    document.documentElement.classList.toggle("dark", newMode); // Alterna a classe 'dark' no HTML para refletir a mudança.
    localStorage.setItem("darkMode", newMode); // Salva a nova preferência no localStorage.
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children} {/* Renderiza os componentes filhos, permitindo que acessem o contexto. */}
    </DarkModeContext.Provider>
  );
}
