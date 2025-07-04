// Importa o React e os hooks necessários
import React, { createContext, useEffect, useState } from 'react';

// Importa o módulo de autenticação do Firebase
import { auth } from '../firebase';

// Cria o contexto que será usado em toda a aplicação
export const AuthContext = createContext();

// Componente provedor do contexto de autenticação
export function AuthProvider({ children }) {
  // Estado para armazenar o usuário autenticado
  const [currentUser, setCurrentUser] = useState(null);

  // Estado para indicar se a verificação de autenticação está em andamento
  const [loading, setLoading] = useState(true);

  // useEffect que se inscreve nas mudanças de autenticação do Firebase
  useEffect(() => {
    // Escuta alterações de estado de autenticação (login, logout)
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);     // Atualiza usuário atual
      setLoading(false);        // Finaliza carregamento
    });

    // Remove a escuta quando o componente for desmontado
    return unsubscribe;
  }, []);

  // Objeto com os dados do contexto
  const value = {
    currentUser,
    loading
  };

  // Retorna o provedor com os filhos, garantindo que só sejam renderizados após o carregamento
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
