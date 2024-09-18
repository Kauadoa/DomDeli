import { useState } from "react";

export default function CadastrarItem() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para cadastro de item
    console.log({ nome, descricao, preco, imagem });
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Cadastrar Item</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="nome" className="block text-gray-700">Nome do Item</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-2 border rounded mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="descricao" className="block text-gray-700">Descrição</label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full p-2 border rounded mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="preco" className="block text-gray-700">Preço</label>
            <input
              id="preco"
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="w-full p-2 border rounded mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imagem" className="block text-gray-700">URL da Imagem</label>
            <input
              id="imagem"
              type="text"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              className="w-full p-2 border rounded mt-2"
              required
            />
          </div>
          <button type="submit" className="w-full bg-emerald-500 text-white p-2 rounded-lg">
            Cadastrar
          </button>
        </form>

        {/* Previa do Item */}
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Prévia do Item</h3>
          <div className="border rounded-lg p-4">
            {imagem && <img src={imagem} alt="Imagem do item" className="w-full h-40 object-cover mb-4" />}
            <h4 className="text-xl font-semibold">{nome || 'Nome do Item'}</h4>
            <p className="text-gray-600">{descricao || 'Descrição do item...'}</p>
            <p className="text-emerald-500 font-bold">R$ {preco || '0,00'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
