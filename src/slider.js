// Libraries
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Slider from '@material-ui/core/Slider'
import { withStyles, makeStyles } from '@material-ui/core/styles'
// Material Components
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import FormHelperText from '@material-ui/core/FormHelperText'

// Styles
const useStyles = makeStyles({
  root: {
    width: 300
  }
})

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)'
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider)

const CommonSlider = ({
  name,
  label,
  type,
  register,
  errors,
  icon: Icon,
  inputProps,
  className,
  helpText,
  value,
  required,
  setValue,
  disabled,
  onChange,
  getValues,
  tooltip,
  error,
  ...props
}) => {
  const classes = useStyles()
  const [inputValue, setInputValue] = useState(value || 0)

  const handleChange = (event, newValue) => {
    setInputValue(newValue)
    if (onChange) {
      onChange(event.target.value, newValue)
    }
  }

  useEffect(() => {
    register && register({ name, required })
  }, [register, name, required])

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setInputValue(value)
    }
  }, [value])

  useEffect(() => {
    setValue && setValue(name, inputValue)
  }, [setValue, name, inputValue])

  return (
    <Box flexDirection='column' display='flex' className={classes.root}>
      <Typography id='range-slider' gutterBottom>
        {label || name}
      </Typography>
      <PrettoSlider
        {...props}
        aria-labelledby='continuous-slider'
        getAriaValueText={value}
        valueLabelDisplay='auto'
        value={inputValue}
        name={name}
        onChange={handleChange}
      />
      {errors && errors[name] && (
        <FormHelperText error>{errors[name].message}</FormHelperText>
      )}
    </Box>
  )
}

CommonSlider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  register: PropTypes.func,
  setValue: PropTypes.func,
  value: PropTypes.bool,
  text: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool
}

CommonSlider.defaultProps = {
  errors: {},
  register: () => {},
  icon: null,
  disabled: false,
  label: '',
  type: 'slider',
  className: '',
  error: false
}

export default CommonSlider
