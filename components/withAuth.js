import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from './AuthContext';

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated } = useContext(AuthContext); // Pega a informação de autenticação
    const router = useRouter();

    useEffect(() => {
      // Se o usuário não estiver autenticado, redireciona para a página de login
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    // Enquanto verifica a autenticação, pode mostrar um loader ou algo assim
    if (!isAuthenticated) {
      return <p>Redirecionando para a página de login...</p>;
    }

    // Renderiza o componente original se estiver autenticado
    return <Component {...props} />;
  };
}
