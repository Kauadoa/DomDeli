# DomDeli

DomDeli é um projeto de aplicativo para pedidos de lanches, desenvolvido para proporcionar uma experiência de compra online simples e eficiente. O projeto foi desenvolvido por Kauã, visando fornecer uma solução prática para o gerenciamento de pedidos e itens em um ambiente de entregas.

## Funcionalidades

- **Interface de Cadastro de Itens**: Permite a adição de novos itens com detalhes como nome, descrição, preço, imagem e uma lista de ingredientes.
- **Gerenciamento de Pedidos**: Cria, lista e atualiza pedidos, com a capacidade de adicionar itens e marcar pedidos como enviados.
- **Sistema de Pagamento**: Oferece um formulário para entrada de dados de pagamento e informações de entrega.
- **Carrossel de Itens**: Exibe os itens disponíveis em um carrossel para facilitar a visualização e a seleção.
- **Modo Escuro**: Permite a alternância entre modos claro e escuro.
## Tecnologias Utilizadas

- Tailwind CSS: Biblioteca de utilitários CSS para estilização rápida e responsiva.
- Next.js: Framework React para construção de interfaces e rotas.
- MongoDB: Banco de dados NoSQL para armazenamento dos dados da aplicação.
- Mongoose: Biblioteca para modelagem de objetos MongoDB no Node.js.


## Como Rodar o Projeto

### Requisitos

- Node.js
- MongoDB
- Bilbioteca Mongoose

### Configuração do Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/Kauadoa/DomDeli.git
   cd DomDeli
   ```

2. Instale as dependências:
   ```bash
   npm install autoprefixer micro mongoose next postcss react react-dom react-slick slick-carousel stripe sweetalert2 tailwind-scrollbar-hide tailwindcss use-local-storage-state
   npm install
   ```

3. Crie um arquivo `.env` e configure as variáveis de ambiente (veja `.env.example` para referência):
   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   STRIPE_PUBLIC_KEY=your_stripe_pk_key
   STRIPE_SECRET_KEY=your_stripe_sk_key
   ```

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

### Popular o Banco de Dados

Uma funçao para popular o banco de dados com produtos de exemplo pode ser encontrado no arquivo `pages/index.js`. Execute-a retirando as barras de comentário:
```bash
  };

/*função para popular banco abaixo*/

// handlePopulateProducts();  // Função para popular o banco de dados. /*Retire as barras do começo esta linha de comando e recarregue a pagina inicial, volte e adicione-as novamente para funcionamento o correto do projeto*/  

/*função para popular banco acima*/

  // Declara um estado local para o termo de pesquisa.
  const [phrase, setPhrase] = useState('');node scripts/populateDatabase.js
```

## Estrutura do Banco de Dados

- Itens: Armazena informações sobre os itens do cardápio, incluindo nome, descrição, preço, categoria, imagem e ingredientes.
- Pedidos: Armazena informações sobre os pedidos realizados, incluindo itens, quantidade, subtotal, valor de entrega e total.

## Contribuições

Sinta-se à vontade para contribuir com melhorias, correções e novos recursos. Faça um fork do repositório, crie uma branch para suas alterações e envie um pull request.

## Contato

Para mais informações ou dúvidas, entre em contato com Kauã:
- Email: [seu-email@example.com](mailto:seu-email@example.com)
- GitHub: [Kauadoa](https://github.com/Kauadoa)

*****SERA ATUALIZADO 20/09/24
