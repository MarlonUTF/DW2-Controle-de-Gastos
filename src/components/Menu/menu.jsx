import React, { useState } from 'react';
import Perfil from "./Perfil/perfil";
import IA from "./IA/ia";
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Botão de Toggle */}
      <IconButton
        onClick={toggleMenu}
        className="!bg-teal-600 !text-white shadow-lg hover:!bg-teal-700"
      >
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      
      {/* Painel do Menu (sobreposição) */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30" onClick={toggleMenu}>
          <div 
            className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-blue-50 to-purple-50 shadow-xl transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full flex flex-col">
              <Perfil />
              <IA />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}