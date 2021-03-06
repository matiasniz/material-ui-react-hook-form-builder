// Libraries
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'

// Material Components
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

const CommonFormRadio = ({
  idx,
  name,
  label,
  setValue,
  register,
  errors,
  value,
  onChange,
  required,
  items,
  helpText
}) => {
  const id = `radio-${idx}-${label || name}`

  const classes = {}
  const [inputValue, setInputValue] = useState(value)

  const handleChange = (evt) => {
    setInputValue(evt.target.value)
    setValue(name, evt.target.value)
    if (onChange) {
      onChange(evt.target.value)
    }
  }

  useEffect(() => {
    register({ name, required })
  }, [name, register, required])

  useEffect(() => {
    setInputValue(inputValue)
    setValue(name, inputValue)
  }, [name, setValue, inputValue]) // If an re-render has a new value

  return (
    <FormControl
      component='fieldset'
      className={classes.formControl}
      id={id}
      error={!!errors[name]}
    >
      <FormLabel component='legend'>{label}</FormLabel>
      <RadioGroup
        aria-label={name}
        name={name}
        value={inputValue}
        onChange={handleChange}
      >
        {map(items, (item, key) => (
          <FormControlLabel {...item} key={key} control={<Radio />} />
        ))}
      </RadioGroup>
      {errors[name] && <FormHelperText>{errors[name].message}</FormHelperText>}
      {helpText && !errors[name] && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  )
}

CommonFormRadio.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any
    })
  ).isRequired
}

CommonFormRadio.defaultProps = {
  errors: {},
  value: null
}

export default CommonFormRadio
