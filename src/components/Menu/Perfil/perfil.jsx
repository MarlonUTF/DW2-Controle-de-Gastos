// Importa componentes do Material UI
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

// Importa hooks do React Router e Contexto
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

// Importa autenticação do Firebase e função de logout
import { auth } from '@firebase-config';
import { signOut } from 'firebase/auth';

// Importa o contexto de autenticação
import { AuthContext } from '@/contexts/AuthContext';

// Componente que exibe as informações do usuário autenticado
export default function Perfil() {
  const navigate = useNavigate(); // hook para redirecionar
  const { currentUser } = useContext(AuthContext); // pega o usuário logado

  // Função que faz logout do Firebase e redireciona para login
  const handleLogout = async () => {
    try {
      await signOut(auth); // desloga o usuário atual
      navigate('/login');  // redireciona para a tela de login
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Função que extrai as iniciais do nome do usuário
  const getInitials = (name) => {
    if (!name) return 'U'; // retorna "U" se não tiver nome
    const names = name.split(' ');
    return names.length > 1 
      ? `${names[0][0]}${names[names.length-1][0]}` // primeira e última iniciais
      : names[0][0]; // se só tiver um nome, pega a primeira letra
  };

  return (
    <div className="w-full p-4 bg-white shadow-md flex justify-between items-center">
      {/* Avatar e nome/email do usuário */}
      <div className="flex items-center gap-3">
        <Avatar
          sx={{ 
            width: 48, 
            height: 48, 
            bgcolor: '#0d9488',           // fundo teal
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
          className='border-2 border-teal-600' // borda personalizada
        >
          {/* Iniciais do nome do usuário */}
          {currentUser?.displayName ? getInitials(currentUser.displayName) : 'U'}
        </Avatar>
        
        {/* Informações de texto do usuário */}
        <div className="flex flex-col">
          <div className='font-bold text-gray-800 text-sm'>
            {currentUser?.displayName || 'Usuário'} {/* nome ou fallback */}
          </div>
          <div className='text-xs text-gray-500'>
            {currentUser?.email || 'usuario@email.com'} {/* email ou fallback */}
          </div>
        </div>
      </div>

      {/* Botão de logout com ícone */}
      <Button 
        variant="outlined" 
        color="error"
        onClick={handleLogout}
        className="!py-1 !text-xs"
        size="small"
        startIcon={<LogoutIcon />}
      >
        Sair
      </Button>
    </div>
  );
}
