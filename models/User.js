// Importa os métodos model, models e Schema do mongoose
import { model, models, Schema } from "mongoose";

// Define o esquema do Usuario
const UserSchema = new Schema({
  name: String, // Nome do usuario
  email: String, // Email do usuario
  password: String, // Eenha do usuario
});

// Exporta o modelo User, reutilizando se já estiver definido, ou cria um novo
const User = models?.User || model('User', UserSchema);

export default User;
