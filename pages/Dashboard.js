import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Dashboard</h1>
      <div className="flex flex-col space-y-4">
        <Link href="/add-item">
          <a className="bg-emerald-500 text-white px-4 py-2 rounded-lg">
            Adicionar Item
          </a>
        </Link>
        <Link href="/view-orders">
          <a className="bg-emerald-500 text-white px-4 py-2 rounded-lg">
            Ver Pedidos
          </a>
        </Link>
      </div>
    </div>
  );
}
