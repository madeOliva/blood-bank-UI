import { Dialog, DialogTitle, DialogContent, DialogActions,  Typography } from '@mui/material';
import { CheckCircle, Error, Info, Warning } from '@mui/icons-material';
import BotonPersonalizado from './Button';

// Definimos los tipos de modal disponibles
export type ModalType = 'success' | 'error' | 'warning' | 'info';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: ModalType;
  showConfirmButton?: boolean;
  confirmText?: string;
  onConfirm?: () => void;
}

const ModalPersonalizado = ({
  open,
  onClose,
  title,
  message,
  type = 'info',
  showConfirmButton = true,
  confirmText = 'Aceptar',
  onConfirm
}: ModalProps) => {
  // Objeto para mapear tipos con colores e iconos
  const typeStyles = {
    success: {
      icon: <CheckCircle color="success" sx={{ fontSize: 90 }} />,
      color: 'success.main'
    },
    error: {
      icon: <Error color="error" sx={{ fontSize: 90 }} />,
      color: 'error.main'
    },
    warning: {
      icon: <Warning color="warning" sx={{ fontSize: 90 }} />,
      color: 'warning.main'
    },
    info: {
      icon: <Info color="info" sx={{ fontSize: 90 }} />,
      color: 'info.main'
    }
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          minWidth: '400px',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center'
        }
      }}
    >
      <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', justifyContent: 'center' }}>
        {typeStyles[type].icon}
      </DialogTitle>
      <DialogContent>
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            color: typeStyles[type].color 
          }}
        >
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', paddingBottom: '20px' }}>
        {showConfirmButton && (
          <BotonPersonalizado
            onClick={handleConfirm}
            sx={{ width: '120px', marginTop: '10px' }}
            autoFocus
          >
            {confirmText}
          </BotonPersonalizado>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ModalPersonalizado;