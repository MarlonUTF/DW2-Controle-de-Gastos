import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { AuthContext } from './contexts/AuthContext'
import { useContext } from 'react'

function PrivateRoute({ children }) {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter basename="/DW2-Controle-de-Gastos">
      <Routes>
        <Route path="/login" element={<Login />} />
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