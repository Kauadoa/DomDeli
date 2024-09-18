import { useState, useEffect } from "react";

export default function VerPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    // Simulação de busca de pedidos (pode ser substituído por uma chamada à API)
    const pedidosExemplo = [
      { id: 1, item: "Pizza", quantidade: 2, status: "Pendente" },
      { id: 2, item: "Hambúrguer", quantidade: 1, status: "Enviado" },
    ];
    setPedidos(pedidosExemplo);
  }, []);

  return (
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
              <tr key={pedido.id} className="border-b">
                <td className="p-2">{pedido.item}</td>
                <td className="p-2">{pedido.quantidade}</td>
                <td className="p-2">{pedido.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
