import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { auth } from '@firebase-config';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';

export default function Perfil() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    return names.length > 1 
      ? `${names[0][0]}${names[names.length-1][0]}` 
      : names[0][0];
  };

  return (
    <div className="w-full p-4 bg-white shadow-md flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Avatar
          sx={{ 
            width: 48, 
            height: 48, 
            bgcolor: '#0d9488',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
          className='border-2 border-teal-600'
        >
          {currentUser?.displayName ? getInitials(currentUser.displayName) : 'U'}
        </Avatar>
        <div className="flex flex-col">
          <div className='font-bold text-gray-800 text-sm'>
            {currentUser?.displayName || 'Usuário'}
          </div>
          <div className='text-xs text-gray-500'>
            {currentUser?.email || 'usuario@email.com'}
          </div>
        </div>
      </div>
      
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