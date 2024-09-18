import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import { DarkModeContext } from "./DarkModeContext";

export default function Header() {
  const router = useRouter();
  const path = router.pathname;
  const { selectedProducts } = useContext(ProductsContext);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [showMenu, setShowMenu] = useState(false); // Estado para mostrar/ocultar o menu

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <header
      className={`p-5 w-full flex justify-between items-center border-b ${
        darkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-200 text-gray-400'
      }`}
    >
      <div className="flex space-x-12">
        <Link href={'/'}>
          <a className={`${path === '/' ? 'text-emerald-500' : ''} flex flex-col items-center`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span>Home</span>
          </a>
        </Link>
        <Link href={'/checkout'}>
          <a className={`${path === '/checkout' ? 'text-emerald-500' : ''} flex flex-col items-center`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <span>Carrinho {selectedProducts.length}</span>
          </a>
        </Link>
      </div>
      <div className="flex space-x-8">
        
        <div className="relative">
          <div onClick={toggleMenu} className="cursor-pointer flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 1.5c5.799 0 10.5 4.701 10.5 10.5S17.799 22.5 12 22.5 1.5 17.799 1.5 12 6.201 1.5 12 1.5z"
              />
            </svg>
            <span>Configurações</span>
          </div>
          {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <div onClick={toggleDarkMode} className="cursor-pointer flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0l-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z" />
          </svg>
          <span>{darkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
        </div>
          <Link href="/product/cadastraritem">
            <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Cadastrar Itens</a>
          </Link>
          <Link href="/product/ver-pedidos">
            <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Ver Pedidos</a>
          </Link>
        </div>
      )}
        </div>
      </div>
    </header>
  );
}
