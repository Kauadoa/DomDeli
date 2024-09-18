import { useEffect } from 'react';

export default function ChatraWidget() {
  useEffect(() => {
    // Função auto-executável que insere o script do Chatra no documento.
    (function(d, w, c) {
        w.ChatraID = 'dSqT7jb7dk3vwJSMW'; // Define o ID do Chatra.
        var s = d.createElement('script'); // Cria um elemento <script>.
        w[c] = w[c] || function() {
            (w[c].q = w[c].q || []).push(arguments); // Inicializa o array de argumentos para o Chatra.
        };
        s.async = true; // Define o script como assíncrono.
        s.src = 'https://call.chatra.io/chatra.js'; // Define a URL do script do Chatra.
        if (d.head) d.head.appendChild(s); // Adiciona o script ao cabeçalho do documento.
    })(document, window, 'Chatra');
  }, []);

  return null; // Este componente não tem interface visual; serve apenas para carregar o widget do Chatra.
}
