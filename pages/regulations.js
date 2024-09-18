import Layout from "../components/Layout";

export default function Regulations() {
  return (
    <>
    <Layout />
      <div className="p-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300">
        <h1 className="text-2xl font-bold mb-4">Regulamentos</h1>
        <p>
          Todos os materiais e recursos disponíveis neste site são para fins
          educativos. O conteúdo aqui exibido é fictício e destinado apenas para
          prática de programação e demonstração.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Uso Responsável</h2>
        <p>
          O uso deste site deve ser feito de maneira responsável. É proibido
          utilizar os recursos para qualquer fim comercial ou de forma que possa
          prejudicar terceiros. O usuário deve respeitar as normas de boa
          conduta e não realizar atividades que possam comprometer a integridade
          do site.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Propriedade Intelectual
        </h2>
        <p>
          Todo o conteúdo apresentado neste site, incluindo textos, imagens e
          outros materiais, são de propriedade exclusiva dos criadores e estão
          protegidos por direitos autorais. É proibida a reprodução,
          distribuição ou modificação do conteúdo sem a devida autorização.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Limitação de Responsabilidade
        </h2>
        <p>
          O site não se responsabiliza por quaisquer danos diretos, indiretos ou
          consequenciais que possam resultar do uso das informações ou recursos
          disponíveis. As informações são fornecidas &quot;como estão&quot; e podem não
          estar atualizadas ou serem imprecisas.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Contato</h2>
        <p>
          Para quaisquer dúvidas ou preocupações relacionadas a estes
          regulamentos, entre em contato conosco através do formulário de
          contato disponível em nosso site pelo StepStyleSac.
        </p>
      </div>
    </>
  );
}
