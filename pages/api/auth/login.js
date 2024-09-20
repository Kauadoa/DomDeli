// api/auth/login
import { initMongoose } from '../../../lib/mongoose';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos' });
  }

  try {
    await initMongoose();

    // Verifica se o usuário existe
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, 'secreta', { expiresIn: '1h' });

    // Definir cookie
    res.setHeader('Set-Cookie', serialize('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hora
      path: '/'
    }));

    // Redirecionar após login bem-sucedido
    return res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}
