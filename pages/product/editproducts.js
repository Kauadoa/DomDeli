import { useState, useEffect } from 'react';
import withAuth from '../../components/withAuth';
import Layout from '../../components/Layout';

function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [picture, setPicture] = useState(""); // Corrigido o nome da variável

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos: ' + response.statusText);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setEditedProduct(product);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setPicture(e.target.files[0]); // Define a nova imagem
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editedProduct.name);
      formData.append('category', editedProduct.category);
      formData.append('description', editedProduct.description);
      formData.append('ingredients', JSON.stringify(editedProduct.ingredients));
      formData.append('price', editedProduct.price);
      // Se a imagem for uma string vazia ou igual à imagem antiga, não envie
    if (picture && picture !== editedProduct.picture) {
        formData.append('picture', picture); // Adiciona a nova URL se for diferente
      }

      const putResponse = await fetch(`/api/products/${editedProduct._id}`, {
        method: 'PUT',
        body: formData, // Enviar como FormData
      });

      if (!putResponse.ok) {
        throw new Error('Erro ao atualizar o produto: ' + putResponse.statusText);
      }

      const updatedProduct = await putResponse.json();
      setProducts(products.map(product => 
        product._id === updatedProduct._id ? updatedProduct : product
      ));
      setEditingProduct(null);
      setEditedProduct({}); // Limpar o estado após salvar
      setPicture(""); // Resetar imagem
    } catch (error) {
      console.error('Erro ao salvar o produto', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteResponse = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!deleteResponse.ok) {
        const errorMessage = await deleteResponse.json();
        throw new Error('Erro ao excluir o produto: ' + errorMessage.error);
      }
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Erro ao excluir o produto:', error.message);
    }
  };

  return (
    <Layout title="Gerenciamento de Produtos">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Gerenciamento de Produtos</h1>
        <ul className="space-y-6">
          {products.map((product) => (
            <li key={product._id} className="border p-4 rounded-lg shadow-md">
              {editingProduct === product._id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold">Nome:</label>
                    <input
                      type="text"
                      value={editedProduct.name}
                      onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                      className="border w-full p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold">Preço (R$):</label>
                    <input
                      type="number"
                      value={editedProduct.price}
                      onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                      className="border w-full p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold">Ingredientes:</label>
                    <input
                      type="text"
                      value={editedProduct.ingredients.join(', ')}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, ingredients: e.target.value.split(', ') })
                      }
                      className="border w-full p-2 rounded-md"
                      placeholder="Separe os ingredientes por vírgula"
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
                onChange={(e) => setPicture(e.target.value)}
                className="w-full p-2 border rounded mt-2"
                required
              />
            </div>
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{product.name}</p>
                    <p>R${product.price}</p>
                    <p>Ingredientes: {product.ingredients.join(', ')}</p>
                    {product.picture && (
                      <img
                        src={product.picture}
                        alt={product.name}
                        className="w-32 h-32 object-cover mt-2"
                      />
                    )}
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default withAuth(ProductsAdmin);
