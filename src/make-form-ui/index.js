import React, { useState } from 'react'

import FormBuilder from './..'

import {
  Container,
  Divider,
  Paper,
  Typography,
  Button
} from '@material-ui/core'

import NumberPropertiesDialog from './dialogs/number-text-field-properties'
import TextPropertiesDialog from './dialogs/text-field-properties'
import SelectPropertiesDialog from './dialogs/select-properties'
import GroupOptionPropertiesDialog from './dialogs/group-options-properties'
import CheckboxPropertiesDialog from './dialogs/checkbox-properties'
import SilderPropertiesDialog from './dialogs/slider-properties'

import TextFieldsIcon from '@material-ui/icons/TextFields'
import DialpadIcon from '@material-ui/icons/Dialpad'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import TuneIcon from '@material-ui/icons/Tune'

export const MakeFormUI = ({ callback }) => {
  const [formData, setFormData] = useState({})
  const [openNumberTextFieldDialog, setOpenNumberTextFieldDialog] = useState(
    false
  )
  const [textFieldDialog, setTextFieldDialog] = useState(false)
  const [selectDialog, setSelectDialog] = useState(false)
  const [groupOptionDialog, setGroupOptionDialog] = useState(false)
  const [checkboxDialog, setCheckboxDialog] = useState(false)
  const [sliderDialog, setSliderDialog] = useState(false)

  const handleSubmit = (data) => {
    callback({ data, json: formData })
  }

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: '20px'
      }}
    >
      <Paper
        style={{
          flex: 1,
          padding: '10px'
        }}
      >
        <Typography variant='h3' component='h3' style={{ padding: '10px' }}>
          Seleccionar controles
        </Typography>
        <Divider />

        <Paper
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '18px',
            gap: '20px',
            marginTop: '20px'
          }}
        >
          <TextPropertiesDialog
            open={textFieldDialog}
            setOpen={setTextFieldDialog}
            setFormData={setFormData}
            formData={formData}
          >
            <Button
              variant='contained'
              color='secondary'
              fullWidth
              startIcon={<TextFieldsIcon />}
              onClick={() => setTextFieldDialog(true)}
            >
              Campo de texto
            </Button>
          </TextPropertiesDialog>

          <NumberPropertiesDialog
            open={openNumberTextFieldDialog}
            setOpen={setOpenNumberTextFieldDialog}
            setFormData={setFormData}
            formData={formData}
          >
            <Button
              variant='contained'
              color='secondary'
              fullWidth
              startIcon={<DialpadIcon />}
              onClick={() => setOpenNumberTextFieldDialog(true)}
            >
              Campo numerico
            </Button>
          </NumberPropertiesDialog>

          <SelectPropertiesDialog
            open={selectDialog}
            setOpen={setSelectDialog}
            setFormData={setFormData}
            formData={formData}
          >
            <Button
              variant='contained'
              color='secondary'
              fullWidth
              startIcon={<ArrowDropDownIcon />}
              onClick={() => setSelectDialog(true)}
            >
              Selector
            </Button>
          </SelectPropertiesDialog>

          <GroupOptionPropertiesDialog
            open={groupOptionDialog}
            setOpen={setGroupOptionDialog}
            setFormData={setFormData}
            formData={formData}
          >
            <Button
              variant='contained'
              color='secondary'
              fullWidth
              startIcon={<RadioButtonCheckedIcon />}
              onClick={() => setGroupOptionDialog(true)}
            >
              Grupo de opciones
            </Button>
          </GroupOptionPropertiesDialog>

          <CheckboxPropertiesDialog
            open={checkboxDialog}
            setOpen={setCheckboxDialog}
            setFormData={setFormData}
            formData={formData}
          >
            <Button
              variant='contained'
              color='secondary'
              fullWidth
              startIcon={<CheckBoxIcon />}
              onClick={() => setCheckboxDialog(true)}
            >
              CheckBox
            </Button>
          </CheckboxPropertiesDialog>

          <SilderPropertiesDialog
            open={sliderDialog}
            setOpen={setSliderDialog}
            setFormData={setFormData}
            formData={formData}
          >
            <Button
              variant='contained'
              color='secondary'
              fullWidth
              startIcon={<TuneIcon />}
              onClick={() => setSliderDialog(true)}
            >
              Barra de desplazamiento
            </Button>
          </SilderPropertiesDialog>
        </Paper>
      </Paper>

      <Paper
        style={{
          flex: 1,
          padding: '10px'
        }}
      >
        <Typography variant='h3' component='h3' style={{ padding: '10px' }}>
          Vista previa
        </Typography>
        <Divider />
        <Paper
          style={{
            marginTop: '20px',
            padding: '10px'
          }}
        >
          {Object.keys(formData).length > 0 && (
            <FormBuilder
              config={formData}
              onSubmit={handleSubmit}
              loading={false}
              submitErrors={[]}
              noBackButton={true}
              button={{
                size: 'medium',
                label: 'Guardar',
                position: 'center',
                disabled: true
              }}
            />
          )}
        </Paper>
      </Paper>
    </Container>
  )
}

export default MakeForm
