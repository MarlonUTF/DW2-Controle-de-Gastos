// Importa os componentes internos
import Pergunta from './Pergunta/pergunta';
import Resposta from './Resposta/resposta';

// Importa o hook useState para controle de estado
import { useState } from 'react';

// Componente principal da interface de "IA"
export default function IA() {
  // Armazena a lista de mensagens (perguntas e respostas)
  const [messages, setMessages] = useState([]);

  // Função chamada ao enviar uma pergunta
  const handleSend = (question) => {
    if (!question.trim()) return; // ignora perguntas em branco

    // Adiciona a pergunta à lista de mensagens
    setMessages(prev => [...prev, { type: 'question', content: question }]);
    
    // Simula uma resposta automática após 1 segundo
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'answer', 
        content: `Esta é uma resposta simulada para: "${question}". Em uma implementação real, esta área se conectaria a um serviço de IA como OpenAI ou Gemini.` 
      }]);
    }, 1000);
  };

  return (
    <div className="flex-grow flex flex-col p-4 bg-white">
      {/* Área principal com sombra interna e borda */}
      <div className="bg-white rounded-lg shadow-inner flex-grow flex flex-col overflow-hidden border border-gray-200">
        <Resposta messages={messages} /> {/* Lista de mensagens */}
        <Pergunta onSend={handleSend} />  {/* Campo de envio */}
      </div>
    </div>
  );
}
