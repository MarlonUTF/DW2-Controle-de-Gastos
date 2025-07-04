// Importa o hook useEffect e os componentes do MUI (Material UI)
import { useEffect } from "react";
import { Alert, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Componente de alerta reutilizável
export default function AlertComponent({ open, setOpen, message, severity }) {
  // Efeito que fecha o alerta automaticamente após 2 segundos
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false); // fecha o alerta
      }, 2000);

      // Limpa o timeout se o componente desmontar ou open mudar
      return () => clearTimeout(timer);
    }
  }, [open, setOpen]);

  // Função para fechar manualmente o alerta (botão X)
  const handleClose = () => {
    setOpen(false);
  };

  // Renderiza o alerta centralizado na parte superior da tela com animação de entrada
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <Slide direction="right" in={open} mountOnEnter unmountOnExit>
        <Alert
          severity={severity} // tipo do alerta (error, success, warning, info)
          action={
            // Botão de fechar o alerta manualmente
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{
            boxShadow: 3,       // sombra leve
            borderRadius: 1,    // bordas arredondadas
          }}
        >
          {message} {/* mensagem exibida no alerta */}
        </Alert>
      </Slide>
    </div>
  );
}
