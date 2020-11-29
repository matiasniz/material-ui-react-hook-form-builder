import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import NumberFormat from 'react-number-format';
import { Box } from '@material-ui/core';

export default function FormDialog({
  open = false,
  setOpen,
  children,
  setFormData,
  formData = {}
}) {
  const [name, setName] = useState('');

  const NumberFormatCustom = ({ inputRef, onChange, ...props }) => (
    <NumberFormat
      {...props}
      decimalSeparator={false}
      decimalScale={false}
      allowNegative={true}
      getInputRef={inputRef}
      onValueChange={({ value }) => {
        onChange({
          target: {
            name: props.name,
            value
          }
        });
      }}
      isNumericString
      prefix={props.prefix}
    />
  );

  return (
    <div>
      {children}
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        onClose={() => setOpen(false)}
      >
        <DialogTitle id="form-dialog-title">
          Agregar barra de desplazamiento
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Configurar propiedades de la barra de desplazamiento
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

          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '14px',
              marginTop: '20px'
            }}
          >
            <TextField
              id="minimo"
              name="minimo"
              label="Minimo"
              defaultValue={0}
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
            />
            <TextField
              id="maximo"
              name="maximo"
              label="Maximo"
              defaultValue={100}
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            onClick={() => {
              let min = document.getElementById('minimo').value;
              let max = document.getElementById('maximo').value;
              if (name.trim().length === 0 || max <= min) return;
              setFormData({
                ...formData,
                [name]: {
                  type: 'slider',
                  name: name,
                  min: Number(min),
                  max: Number(max),
                  step: 1,
                  text: name,
                  label: name,
                  //   disabled: true,
                  style: { marginTop: '10px' }
                }
              });
              setOpen(false);
              setName('');
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
