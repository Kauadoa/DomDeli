import { useState, useEffect } from "react";
import Layout from "../../components/Layout";

export default function VerPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar pedidos da API
    const fetchPedidos = async () => {
      try {
        const response = await fetch('/api/get-orders');
        if (response.ok) {
          const data = await response.json();
          setPedidos(data);
        } else {
          console.error("Erro ao buscar pedidos:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (loading) {
    return <p>Carregando pedidos...</p>;
  }

  if (!pedidos.length) {
    return <p>Nenhum pedido encontrado.</p>;
  }

  return (
    <>
      <Layout title="Ver Pedidos"/>
      <div className="p-10 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center">Pedidos</h2>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Item</th>
                <th className="p-2">Quantidade</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido._id} className="border-b">
                  <td className="p-2">{pedido.products.map(p => p.price_data.product_data.name).join(', ')}</td>
                  <td className="p-2">{pedido.products.length}</td>
                  <td className="p-2">{pedido.paid ? 'Pago' : 'Pendente'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
