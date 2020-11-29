import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ChipInput from 'material-ui-chip-input';

export default function FormDialog({
  open = false,
  setOpen,
  children,
  setFormData,
  formData = {}
}) {
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);

  return (
    <div>
      {children}
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        onClose={() => setOpen(false)}
      >
        <DialogTitle id="form-dialog-title">Agregar selector</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Configurar propiedades del selector
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

          <ChipInput
            style={{ marginTop: '20px' }}
            fullWidth
            label={'Escribe una opcion y presiona Enter'}
            value={items}
            onAdd={chip => {
              let newItems = [...items];
              newItems.push(chip);
              setItems(newItems);
            }}
            onDelete={(chip, index) => {
              let newItems = [...items];
              newItems.splice(index, 1);
              setItems(newItems);
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              setOpen(false);
              setItems([]);
            }}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            onClick={() => {
              if (items.length === 0 || name.trim().length === 0) return;
              setFormData({
                ...formData,
                [name]: {
                  type: 'select',
                  name: name,
                  label: name,
                  items: items.map(i => {
                    return { name: i, id: i };
                  }),
                  // disabled: true,
                  style: { marginTop: '10px' }
                }
              });
              setItems([]);
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
