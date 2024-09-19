# DomDeli

DomDeli é um projeto de aplicativo para pedidos de lanches, desenvolvido para proporcionar uma experiência de compra online simples e eficiente. O projeto foi desenvolvido em aproximadamente 3 dias por Kauã, visando fornecer uma solução prática para o gerenciamento de pedidos e itens em um ambiente de entregas.

## Funcionalidades

- **Interface de Cadastro de Itens**: Permite a adição de novos itens com detalhes como nome, descrição, preço, imagem e uma lista de ingredientes.
- **Gerenciamento de Pedidos**: Cria, lista e atualiza pedidos, com a capacidade de adicionar itens e marcar pedidos como enviados.
- **Sistema de Pagamento**: Oferece um formulário para entrada de dados de pagamento e informações de entrega.
- **Carrossel de Itens**: Exibe os itens disponíveis em um carrossel para facilitar a visualização e a seleção.
- **Modo Escuro**: Permite a alternância entre modos claro e escuro.
- **Cálculo de Frete**: Calcula o subtotal, custo de entrega e total com base nos produtos selecionados e CEP do usuário.
- **Tempo de Entrega**: Estima o tempo de entrega com base na distância e no tempo de preparo dos itens.

## Tecnologias Utilizadas

- **Frontend**: React, Tailwind CSS
- **Backend**: Express.js, MySQL
- **Banco de Dados**: MongoDB
- **APIs**: Google Maps API (para cálculo de distância)

## Como Rodar o Projeto

### Requisitos

- Node.js
- MongoDB
- MySQL

### Configuração do Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/Kauadoa/DomDeli.git
   cd DomDeli/backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` e configure as variáveis de ambiente (veja `.env.example` para referência):
   ```plaintext
   MONGODB_URL=your_mongodb_connection_string
   MYSQL_HOST=your_mysql_host
   MYSQL_USER=your_mysql_user
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_DATABASE=your_mysql_database
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

### Configuração do Frontend

1. Navegue até a pasta do frontend:
   ```bash
   cd ../frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### Popular o Banco de Dados

Um script para popular o banco de dados com produtos de exemplo pode ser encontrado na pasta `scripts`. Execute-o com:
```bash
node scripts/populateDatabase.js
```

## Estrutura do Projeto

- `backend/` - Contém o código do servidor Express.js e configuração do banco de dados.
- `frontend/` - Contém o código React para a interface do usuário.
- `scripts/` - Scripts auxiliares, como o de popular o banco de dados.

## Contribuições

Sinta-se à vontade para contribuir com melhorias, correções e novos recursos. Faça um fork do repositório, crie uma branch para suas alterações e envie um pull request.

## Contato

Para mais informações ou dúvidas, entre em contato com Kauã:
- Email: [seu-email@example.com](mailto:seu-email@example.com)
- GitHub: [Kauadoa](https://github.com/Kauadoa)

*****SERA ATUALIZADO 20/09/24
