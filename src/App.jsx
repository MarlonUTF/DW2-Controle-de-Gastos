// Importa componentes e funções da biblioteca react-router-dom:
// - BrowserRouter para configurar o roteamento baseado em URL
// - Routes e Route para definir as rotas
// - Navigate para redirecionamento
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Importa as páginas Home e Login que serão usadas nas rotas
import Home from './pages/Home'
import Login from './pages/Login'

// Importa o contexto de autenticação
import { AuthContext } from './contexts/AuthContext'

// Importa o hook useContext para acessar o contexto
import { useContext } from 'react'

// Componente que protege rotas privadas (acessíveis apenas se o usuário estiver autenticado)
function PrivateRoute({ children }) {
  // Acessa o usuário atual do contexto de autenticação
  const { currentUser } = useContext(AuthContext);

  // Se houver um usuário logado, renderiza o conteúdo (children),
  // senão redireciona para a página de login
  return currentUser ? children : <Navigate to="/login" />;
}

// Componente principal da aplicação, define as rotas
export default function App() {
  return (
    // Define o roteador da aplicação com um caminho base
    <BrowserRouter basename="/DW2-Controle-de-Gastos">
      <Routes>
        {/* Rota pública para a página de login */}
        <Route path="/login" element={<Login />} />

        {/* Rota protegida: acessível apenas com autenticação */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}
// O componente App define as rotas da aplicação usando react-router-dom.
// Ele inclui uma rota pública para login e uma rota privada para a página inicial,
// que só pode ser acessada se o usuário estiver autenticado.