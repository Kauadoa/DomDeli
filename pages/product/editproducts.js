import { useState, useEffect } from 'react';
import withAuth from '../../components/withAuth';
import { findAllProducts } from '../api/products';
function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  // Função para buscar todos os produtos
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos: ' + response.statusText);
        }
        const data = await response.json();
        setProducts(data); // Aqui você define os produtos diretamente
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
  };

  // Função para salvar as alterações
  const handleSave = async () => {
    try {
      const putResponse = await fetch('/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });
  
      if (!putResponse.ok) {
        throw new Error('Erro ao atualizar o produto: ' + putResponse.statusText);
      }
  
      setEditingProduct(null);
  
      const updatedProduct = await putResponse.json();
      // Atualiza a lista de produtos com o produto editado
      setProducts(products.map((product) => 
        product._id === updatedProduct._id ? updatedProduct : product
      ));
    } catch (error) {
      console.error('Erro ao salvar o produto', error);
    }
  };
  

  // Função para excluir um produto
const handleDelete = async (id) => {
    try {
      // Fazendo a solicitação DELETE para excluir o produto
      const deleteResponse = await fetch('/api/products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      if (!deleteResponse.ok) {
        throw new Error('Erro ao excluir o produto: ' + deleteResponse.statusText);
      }
  
      // Atualiza a lista de produtos após a exclusão
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Erro ao excluir o produto', error);
    }
  };
  

  return (
    <div>
      <h1>Gerenciamento de Produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {editingProduct === product._id ? (
              <div>
                <input
                  type="text"
                  value={editedProduct.name}
                  onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                />
                <input
                  type="text"
                  value={editedProduct.price}
                  onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                />
                <button onClick={handleSave}>Salvar</button>
              </div>
            ) : (
              <div>
                <p>{product.name} - R${product.price}</p>
                <button onClick={() => handleEdit(product)}>Editar</button>
                <button onClick={() => handleDelete(product._id)}>Excluir</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default withAuth(ProductsAdmin);