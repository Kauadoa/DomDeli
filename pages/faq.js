import Layout from "../components/Layout";
export default function FAQ() {
    return (
        <>
      <Layout />
      <div className="p-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300">
        <h1 className="text-2xl font-bold mb-4">Dúvidas Frequentes</h1>
        <p>
          Aqui estão algumas perguntas comuns sobre o site:
        </p>
        <ul className="list-disc ml-8">
          <li>Este site é real? Não, este é um site educacional.</li>
          <li>Posso fazer compras? Não, este site é para prática de programação.</li>
          <li>O sistema de pagamento funciona?Sim porém não leva a um pedido real pois é um site fictício</li>
        </ul>
      </div>
      </>
    );
  }
  