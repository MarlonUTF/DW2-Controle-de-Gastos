// Importa React e o hook useState
import React, { useState } from 'react';

// Importa componentes internos
import Perfil from "./Perfil/perfil";
import IA from "./IA/ia";

// Importa botão de ícone do MUI e os ícones usados
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// Componente do menu flutuante
export default function Menu() {
  // Estado para controlar se o menu está aberto ou fechado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Alterna o estado do menu (abrir/fechar)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Botão flutuante para abrir ou fechar o menu */}
      <IconButton
        onClick={toggleMenu}
        className="!bg-teal-600 !text-white shadow-lg hover:!bg-teal-700"
      >
        {/* Mostra o ícone de fechar ou abrir dependendo do estado */}
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      
      {/* Menu lateral com sobreposição escura ao fundo */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30" onClick={toggleMenu}>
          <div 
            className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-blue-50 to-purple-50 shadow-xl transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar dentro do menu
          >
            <div className="h-full flex flex-col">
              {/* Conteúdo do menu: Perfil e IA */}
              <Perfil />
              <IA />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
