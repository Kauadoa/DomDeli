import React, { useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { ProductsContext } from '../components/ProductsContext'; // Certifique-se de ajustar o caminho conforme necessário

const PaymentStatus = () => {
  const router = useRouter();
  const { status } = router.query; // Obtém o status da query string
  const { setSelectedProducts } = useContext(ProductsContext); // Obtém a função para atualizar o carrinho

  useEffect(() => {
    if (status) {
      // Exibe o SweetAlert com base no status
      if (status === 'success') {
        Swal.fire({
          title: 'Pagamento Concluído',
          text: 'Seu pagamento foi realizado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Voltar ao Início',
          customClass: {
            confirmButton: 'custom-swal-button', // Adiciona uma classe personalizada ao botão
          },
        }).then(() => {
          setSelectedProducts([]); // Limpa o carrinho
          router.push('/'); // Redireciona para a página inicial
        });
      } else if (status === 'canceled') {
        Swal.fire({
          title: 'Pagamento Não Concluído',
          text: 'Houve um problema ao processar seu pagamento.',
          icon: 'error',
          confirmButtonText: 'Voltar ao Início',
          customClass: {
            confirmButton: 'custom-swal-button', // Adiciona uma classe personalizada ao botão
          },
        }).then(() => {
          router.push('/'); // Redireciona para a página inicial
        });
      }
    }
  }, [status, router, setSelectedProducts]);

  return null; // Não precisa renderizar nada, o SweetAlert lida com a interface do usuário
};

export default PaymentStatus;
