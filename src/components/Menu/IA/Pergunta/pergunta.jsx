import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function Pergunta({ onSend }) {
  const [question, setQuestion] = useState('');
  
  const handleSubmit = () => {
    if (question.trim()) {
      onSend(question);
      setQuestion('');
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-3 border-t border-gray-200 bg-white h-2/18">
      <div className="flex gap-2 items-center">
        <TextField
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Pergunte à IA sobre suas finanças"
          variant="outlined"
          fullWidth
          multiline
          maxRows={3}
          size="small"
        />
        
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          disabled={!question.trim()}
          className="!min-w-0 !h-12 !bg-teal-600 hover:!bg-teal-700"
        >
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}