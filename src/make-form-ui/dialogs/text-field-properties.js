import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({
  open = false,
  setOpen,
  children,
  setFormData,
  formData = {}
}) {
  const [name, setName] = useState('');

  return (
    <div>
      {children}
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        onClose={() => setOpen(false)}
      >
        <DialogTitle id="form-dialog-title">Agregar campo de texto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Configurar propiedades del campo de texto
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre de la propiedad"
            type="text"
            fullWidth
            onChange={e => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            color="primary"
            onClick={() => {
              if (name.trim().length === 0) return;
              setFormData({
                ...formData,
                [name]: {
                  type: 'text',
                  name: name,
                  label: name,
                  // disabled: true,
                  style: { marginTop: '10px' }
                }
              });
              setOpen(false);
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
