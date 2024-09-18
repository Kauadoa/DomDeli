// Importa o componente Layout para a estrutura da página
import Layout from "../components/Layout";
// Importa o hook useState do React para gerenciar o estado dos campos do formulário
import { useState } from "react";
// Importa o SweetAlert2
import Swal from 'sweetalert2';

export default function ContactPage() {
  // Cria estados para armazenar o nome, email e detalhes do pedido
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário
    // Exibe um alerta SweetAlert indicando que o formulário foi enviado
    Swal.fire({
      title: 'Formulário Enviado!',
      text: 'Obrigado por entrar em contato.',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto p-5">
        {/* Título da página de contato */}
        <h1 className="text-2xl font-bold mb-4">Nos contate</h1>
        <form onSubmit={handleSubmit}>
          {/* Campo para o nome do usuário */}
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold">Nome</label>
            <input 
              id="name" 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="bg-gray-100 dark:bg-gray-700 font-bold w-full rounded-lg px-4 py-2 mt-1" 
            />
          </div>
          {/* Campo para o email do usuário */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold">Email</label>
            <input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="bg-gray-100 dark:bg-gray-700 w-full rounded-lg px-4 py-2 mt-1" 
            />
          </div>
          {/* Campo para detalhes adicionais do pedido */}
          <div className="mb-4">
            <label htmlFor="order" className="block font-bold">Mais detalhes:</label>
            <textarea 
              id="order" 
              value={order} 
              onChange={(e) => setOrder(e.target.value)} 
              className="bg-gray-100 dark:bg-gray-700 w-full rounded-lg px-4 py-2 mt-1" 
            />
          </div>
          {/* Botão para enviar o formulário */}
          <button type="submit" className="bg-emerald-500 dark:bg-emerald-600 px-5 py-2 rounded-xl font-bold text-white">
            Enviar
          </button>
        </form>
      </div>
    </Layout>
  );
}
