import { useEffect } from "react";
import { Alert, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AlertComponent({ open, setOpen, message, severity }) {
  // Fechar automaticamente após 2 segundos
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 2000);
      return () => clearTimeout(timer); // limpa o timeout se o componente desmontar
    }
  }, [open, setOpen]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <Slide direction="right" in={open} mountOnEnter unmountOnExit>
        <Alert
          severity={severity}
          action={
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
            boxShadow: 3,
            borderRadius: 1,
          }}
        >
          {message}
        </Alert>
      </Slide>
    </div>
  );
}
