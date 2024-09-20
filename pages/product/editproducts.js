import { useState, useEffect } from 'react';
import withAuth from '../../components/withAuth';
function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  // Função para buscar todos os produtos
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products');
      setProducts(response.data);
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
        // Fazendo a solicitação PUT para atualizar o produto
        const putResponse = await fetch('/api/products', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedProduct)
        });
      
        if (!putResponse.ok) {
          throw new Error('Erro ao atualizar o produto: ' + putResponse.statusText);
        }
      
        setEditingProduct(null);
      
        // Fazendo a solicitação GET para obter a lista atualizada de produtos
        const getResponse = await fetch('/api/products');
        
        if (!getResponse.ok) {
          throw new Error('Erro ao obter a lista de produtos: ' + getResponse.statusText);
        }
      
        const data = await getResponse.json();
        setProducts(data); // Atualiza a lista após a edição
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
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
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