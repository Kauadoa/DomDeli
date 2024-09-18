import { useEffect, useState } from 'react';

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    }
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Pedidos</h1>
      {orders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="mb-4 p-4 border rounded-lg">
              <p><strong>ID do Pedido:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Itens:</strong> {order.items.join(', ')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
