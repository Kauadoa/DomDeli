// api/auth/me.js
import { verify } from 'jsonwebtoken';
import { parse } from 'cookie';

export default async function handler(req, res) {
  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth;

    if (!token) {
      return res.status(401).json({ message: 'Não autenticado' });
    }

    const decoded = verify(token, 'secreta');

    return res.status(200).json({ user: { id: decoded.id, email: decoded.email } });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
