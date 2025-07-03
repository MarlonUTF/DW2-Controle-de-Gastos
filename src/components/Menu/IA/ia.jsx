import Pergunta from './Pergunta/pergunta';
import Resposta from './Resposta/resposta';
import { useState } from 'react';

export default function IA() {
  const [messages, setMessages] = useState([]);
  
  const handleSend = (question) => {
    if (!question.trim()) return;
    
    // Adiciona pergunta
    setMessages(prev => [...prev, { type: 'question', content: question }]);
    
    // Simula resposta da IA
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'answer', 
        content: `Esta é uma resposta simulada para: "${question}". Em uma implementação real, esta área se conectaria a um serviço de IA como OpenAI ou Gemini.` 
      }]);
    }, 1000);
  };

  return (
    <div className="flex-grow flex flex-col p-4 bg-white">
      <div className="bg-white rounded-lg shadow-inner flex-grow flex flex-col overflow-hidden border border-gray-200">
        <Resposta messages={messages} />
        <Pergunta onSend={handleSend} />
      </div>
    </div>
  );
}