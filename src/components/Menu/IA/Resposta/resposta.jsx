// Componente que exibe o histórico de mensagens entre o usuário e o "assistente financeiro"
export default function Resposta({ messages }) {
  return (
    <div 
      className="flex-grow p-4 overflow-y-auto bg-gray-50" 
      style={{ maxHeight: 'calc(100vh - 200px)' }} // Limita a altura do painel de mensagens
    >
      {messages.length === 0 ? (
        // Caso não existam mensagens, mostra uma mensagem de boas-vindas
        <div className="h-full flex flex-col items-center justify-center text-center p-4">
          <div className="bg-teal-100 text-teal-800 p-3 rounded-full mb-3">
            {/* Ícone SVG representando balão de mensagem */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-700 mb-1">Assistente Financeiro</h3>
          <p className="text-gray-500 text-sm">
            Pergunte sobre seus gastos, receitas ou qualquer dúvida financeira.
          </p>
        </div>
      ) : (
        // Caso existam mensagens, exibe cada uma formatada
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-xl ${
                msg.type === 'question' 
                  ? 'bg-teal-100 ml-auto max-w-[80%]'   // Mensagens do usuário vão para a direita
                  : 'bg-purple-100 max-w-[90%]'         // Mensagens da IA ficam à esquerda
              }`}
            >
              {/* Cabeçalho com identificador de quem enviou */}
              <div className="font-medium text-xs mb-1 text-gray-600">
                {msg.type === 'question' ? 'Você:' : 'Assistente:'}
              </div>
              {/* Conteúdo da mensagem */}
              <div className="text-sm">{msg.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
