import { connectToDatabase } from '../../../lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos' });
  }

  try {
    const { db } = await connectToDatabase();

    // Verifica se o usuário já existe
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }

    // Cria o novo usuário
    await db.collection('users').insertOne({ name, email, password });
    return res.status(201).json({ message: 'Conta criada com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}
