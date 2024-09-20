// api/auth/logout.js
import { serialize } from 'cookie';

export default async function handler(req, res) {
  res.setHeader('Set-Cookie', serialize('auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1,
    path: '/'
  }));

  return res.status(200).json({ message: 'Logout bem-sucedido' });
}
