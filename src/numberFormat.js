import React from 'react'

// import PropTypes from 'prop-types';
// import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format'
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import TextField from './textField'
// import FormControl from '@material-ui/core/FormControl';

const CommonNumberFormat = (props) => {
  const { format } = props
  const otherProps = { ...props }
  delete otherProps.format
  console.log({ otherProps })
  const NumberFormatCustom = ({ inputRef, onChange, ...props }) => (
    <NumberFormat
      {...format}
      {...props}
      getInputRef={inputRef}
      onValueChange={({ value }) => {
        onChange({
          target: {
            name: props.name,
            value
          }
        })
      }}
      isNumericString
      prefix={props.prefix}
    />
  )

  return (
    <TextField
      {...otherProps}
      InputProps={{
        inputComponent: NumberFormatCustom
      }}
    />
  )
}

export default CommonNumberFormat
