// Importa o módulo mongoose para gerenciar a conexão com o banco de dados
import mongoose from "mongoose";

// Função para inicializar a conexão com o MongoDB
export async function initMongoose() {
  if (mongoose.connection.readyState === 1) {
    // Se já estiver conectado, retorna a conexão existente
    return mongoose.connection.asPromise();
  }
  // Caso contrário, realiza a conexão usando a URL do MongoDB do ambiente
  return await mongoose.connect(process.env.MONGODB_URL);
}
