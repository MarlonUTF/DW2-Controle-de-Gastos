// Importa componentes do Material UI e hook useState
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

// Componente de input para o usuário digitar a pergunta à IA
export default function Pergunta({ onSend }) {
  // Estado para armazenar o texto da pergunta
  const [question, setQuestion] = useState('');
  
  // Função chamada para enviar a pergunta
  const handleSubmit = () => {
    if (question.trim()) {     // só envia se não for vazio
      onSend(question);        // chama o callback do pai com a pergunta
      setQuestion('');         // limpa o campo após enviar
    }
  };
  
  // Captura tecla pressionada para envio no Enter sem Shift
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();     // previne quebra de linha padrão
      handleSubmit();         // chama envio da pergunta
    }
  };

  return (
    <div className="p-3 border-t border-gray-200 bg-white h-2/18">
      <div className="flex gap-2 items-center">
        {/* Campo de texto para digitar a pergunta */}
        <TextField
          value={question}               // valor do estado
          onChange={(e) => setQuestion(e.target.value)}  // atualiza estado
          onKeyPress={handleKeyPress}   // captura Enter para enviar
          placeholder="Pergunte à IA sobre suas finanças"
          variant="outlined"
          fullWidth
          multiline                     // permite múltiplas linhas
          maxRows={3}                   // limite de 3 linhas
          size="small"
        />
        
        {/* Botão de envio com ícone */}
        <Button 
          variant="contained" 
          onClick={handleSubmit}       // envia ao clicar
          disabled={!question.trim()}  // desabilita se vazio
          className="!min-w-0 !h-12 !bg-teal-600 hover:!bg-teal-700"
        >
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}
