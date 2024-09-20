import { useState } from "react";
import Layout from "../../components/Layout";
import withAuth from "../../components/withAuth"; // Importa o HOC

function CadastrarItem() {
  const [name, setNome] = useState("");
  const [category, setCategoria] = useState("");
  const [description, setDescricao] = useState("");
  const [price, setPreco] = useState("");
  const [picture, setImagem] = useState("");
  const [ingredients, setIngredientes] = useState("");
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ingredientArray = ingredients.split(",").map((ing) => ing.trim()); // Transformar em array
    const product = { 
      name, 
      category, 
      description, 
      price, 
      picture, 
      ingredients: ingredientArray };
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }
      
      // Mostrar mensagem de sucesso
      setSuccessMessage('Item registered successfully!');

      // Rolar a página para o topo suavemente
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Limpar os campos de inserção
      setNome('');
      setCategoria('');
      setDescricao('');
      setPreco('');
      setImagem('');
      setIngredientes('');

      // Limpar a mensagem de sucesso após alguns segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000 /*tempo em ms*/);

    } catch (error) {
      console.error('Error:', error);
      // Mostrar mensagem de erro
      setSuccessMessage('Error registering item!');

      // Rolar a página para o topo suavemente
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Limpar a mensagem de erro após alguns segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000 /*tempo em ms*/);
    }
  };

  return (
    <>
      <Layout title="Cadastrar Item" />
      <div className="body p-10 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center">Cadastrar Item</h2>
        {/* Exibir mensagem de sucesso */}
        {successMessage && (
          <div className="mb-6 text-center">
            <p className="text-green-600 font-bold">{successMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label htmlFor="categoria" className="block text-gray-700">
                Categoria do Item
              </label>
              <input
                id="categoria"
                type="text"
                value={category}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full p-2 border rounded mt-2"
                required
              />
              <label htmlFor="nome" className="block text-gray-700">
                Nome do Item
              </label>
              <input
                id="nome"
                type="text"
                value={name}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-2 border rounded mt-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="descricao" className="block text-gray-700">
                Descrição
              </label>
              <textarea
                id="descricao"
                value={description}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full p-2 border rounded mt-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ingredientes" className="block text-gray-700">Ingredientes (separados por vírgulas)</label>
              <input
                id="ingredientes"
                type="text"
                value={ingredients}
                onChange={(e) => setIngredientes(e.target.value)}
                className="w-full p-2 border rounded mt-2"
                placeholder="Ex: Tomate, Alface, Queijo"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="preco" className="block text-gray-700">
                Preço
              </label>
              <input
                id="preco"
                type="number"
                value={price}
                onChange={(e) => setPreco(e.target.value)}
                className="w-full p-2 border rounded mt-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imagem" className="block text-gray-700">
                URL da Imagem
              </label>
              <p className="block text-gray-700">
                caso esteja na pasta raiz, informe o caminho até a imagem
                juntamente com a terminação {"(.jpeg, .jpg, .png)"}
              </p>
              <input
                id="imagem"
                type="text"
                value={picture}
                placeholder="Ex: /products/image.jpg  ou https://example.com"
                onChange={(e) => setImagem(e.target.value)}
                className="w-full p-2 border rounded mt-2"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white p-2 rounded-lg"
            >
              Cadastrar
            </button>
          </form>

          {/* Previa do Item */}
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Prévia do Item</h3>
            <div className="border rounded-lg p-4">
              <h4 className="text-2xl font-bold mb-4">{category}</h4>
              {picture && (
                <img
                  src={picture}
                  alt="Imagem do item"
                  className="max-w-md h-32 object-cover mb-4"
                />
              )}
              <h5 className="text-xl font-semibold">
                {name || "Nome do Item"}
              </h5>
              <p className="text-gray-600">
                {description || "Descrição do item..."}
              </p>
              <ul className="list-disc list-inside">
                {ingredients.split(',').map((ing, idx) => (
                  <li key={idx} className="text-gray-600">{ing.trim()}</li>
                ))}
              </ul>
              <p className="text-orange-500 font-bold">R$ {price || "0,00"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withAuth(CadastrarItem);