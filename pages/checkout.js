// Importa o SweetAlert2
import Swal from 'sweetalert2';

import Layout from '../components/Layout';

import { ProductsContext } from '../components/ProductsContext';

import { useContext, useEffect, useState } from 'react';

export default function CheckoutPage() {
  // Obtém o contexto dos produtos selecionados e a função para atualizar a seleção
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  // Cria estados para armazenar informações dos produtos, endereço, cidade, nome e email
  const [productsInfos, setProductsInfos] = useState([]);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Efeito colateral que busca informações dos produtos sempre que `selectedProducts` mudar
  useEffect(() => {
    // Remove duplicatas e cria uma lista de IDs únicos dos produtos selecionados
    const uniqIds = [...new Set(selectedProducts)];
    // Faz uma solicitação à API para obter informações dos produtos com base nos IDs
    fetch('/api/products?ids=' + uniqIds.join(','))
      .then(response => response.json())
      .then(json => setProductsInfos(json));
  }, [selectedProducts]);

  // Função para aumentar a quantidade de um produto específico
  function moreOfThisProduct(id) {
    setSelectedProducts(prev => [...prev, id]);
  }

  // Função para diminuir a quantidade de um produto específico
  function lessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts(prev => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  }

  // Define o preço de entrega
  const deliveryPrice = 5;
  // Calcula o subtotal com base nos produtos selecionados
  let subtotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price = productsInfos.find(p => p._id === id)?.price || 0;
      subtotal += price;
    }
  }
  // Formata o subtotal e o total para exibição
  const formattedSubtotal = subtotal.toFixed(2);
  const total = (subtotal + deliveryPrice).toFixed(2);

  // Função para verificar e alertar se o carrinho estiver vazio
  function handleCheckout(event) {
    if (selectedProducts.length === 0) {
      // Evita que o formulário seja enviado
      event.preventDefault();
      // Exibe o alerta usando SweetAlert2
      Swal.fire({
        icon: 'warning',
        title: 'Carrinho Vazio',
        text: 'Por favor, adicione algo ao carrinho antes de finalizar a compra.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
  }

  return (
    <Layout>
      {/* Exibe uma mensagem se não houver produtos selecionados */}
      {!productsInfos.length && (
        <div>no products in your shopping cart</div>
      )}
      {/* Exibe informações dos produtos selecionados */}
      {productsInfos.length && productsInfos.map(productInfo => {
        const amount = selectedProducts.filter(id => id === productInfo._id).length;
        if (amount === 0) return;
        return (
          <div className="flex mb-5 items-center" key={productInfo._id}>
            <div className="bg-gray-100 p-3 rounded-xl shrink-0" style={{ boxShadow: 'inset 1px 0px 10px 10px rgba(0,0,0,0.1)' }}>
              <img className="w-24" src={productInfo.picture} alt="" />
            </div>
            <div className="pl-4 items-center">
              <h3 className="font-bold text-lg">{productInfo.name}</h3>
              <div className="flex mt-1">
                <div className="grow font-bold">${productInfo.price.toFixed(2)}</div>
                <div>
                  {/* Botões para ajustar a quantidade de produtos */}
                  <button onClick={() => lessOfThisProduct(productInfo._id)} className="border border-emerald-500 px-2 rounded-lg text-emerald-500">-</button>
                  <span className="px-2">
                    {amount}
                  </span>
                  <button onClick={() => moreOfThisProduct(productInfo._id)} className="bg-emerald-500 px-2 rounded-lg text-white">+</button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      <form action="/api/checkout" method="POST" onSubmit={handleCheckout}>
        <div className="mt-8">
          {/* Campos de entrada para endereço, cidade, nome e email */}
          <input name="address" value={address} onChange={e => setAddress(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Número da Residência" />
          <input name="city" value={city} onChange={e => setCity(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="CEP" />
          <input name="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Nome" />
          <input name="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="email" placeholder="Email" />
        </div>
        <div className="mt-8">
          {/* Exibe o subtotal, o preço de entrega e o total */}
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
            <h3 className="font-bold">R${formattedSubtotal}</h3>
          </div>
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Entrega:</h3>
            <h3 className="font-bold">R${deliveryPrice.toFixed(2)}</h3>
          </div>
          <div className="flex my-3 border-t pt-3 border-dashed border-emerald-500">
            <h3 className="grow font-bold text-gray-400">Total:</h3>
            <h3 className="font-bold">R${total}</h3>
          </div>
        </div>
        {/* Campo oculto para enviar os IDs dos produtos selecionados */}
        <input type="hidden" name="products" value={selectedProducts.join(',')} />
        {/* Botão para finalizar a compra */}
        <button type="submit" className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4 shadow-emerald-300 shadow-lg">
          Finalizar Compra R${total}
        </button>
      </form>
    </Layout>
  );
}
