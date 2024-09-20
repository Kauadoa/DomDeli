import { useState, useEffect } from 'react';
import withAuth from '../../components/withAuth';
import Layout from '../../components/Layout';

function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [newImage, setNewImage] = useState(null);

  // Função para buscar todos os produtos
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos: ' + response.statusText);
        }
        const data = await response.json();
        setProducts(data); // Define os produtos
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }
    fetchProducts();
  }, []);

  // Função para editar o produto
  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setEditedProduct(product);
    setNewImage(null); // Reseta a imagem nova ao iniciar a edição
  };

  // Função para salvar as alterações
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editedProduct.name);
      formData.append('price', editedProduct.price);
      formData.append('ingredients', JSON.stringify(editedProduct.ingredients));
      if (newImage) {
        formData.append('image', newImage); // Se houver uma nova imagem, adiciona
      }

      const putResponse = await fetch(`/api/products/${editedProduct._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!putResponse.ok) {
        throw new Error('Erro ao atualizar o produto: ' + putResponse.statusText);
      }

      const updatedProduct = await putResponse.json();
      // Atualiza a lista de produtos com o produto editado
      setProducts(products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      ));
      setEditingProduct(null);
    } catch (error) {
      console.error('Erro ao salvar o produto', error);
    }
  };

  // Função para excluir um produto
  const handleDelete = async (id) => {
    try {
      console.log('ID a ser deletado:', id); // Verifique se o ID está correto aqui
      const deleteResponse = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
  
      if (!deleteResponse.ok) {
        const errorMessage = await deleteResponse.json();
        throw new Error('Erro ao excluir o produto: ' + errorMessage.error);
      }
  
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Erro ao excluir o produto: Catch', error.message);
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
                <div>
                  <label className="block text-sm font-bold">Imagem:</label>
                  <input
                    type="file"
                    onChange={(e) => setNewImage(e.target.files[0])}
                    className="border w-full p-2 rounded-md"
                  />
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-32 h-32 mt-2 object-cover"
                    />
                  )}
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
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
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

