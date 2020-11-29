// Libraries
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Slider from '@material-ui/core/Slider'
import { withStyles, makeStyles } from '@material-ui/core/styles'
// Material Components
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'

// Styles
import useStyles from './styles'

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
  const [inputValue, setInputValue] = useState(value || '')

  const handleChange = (evt) => {
    setInputValue(evt.target.value)
    if (onChange) {
      onChange(evt.target.value, getValues)
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
    <Box flexDirection='row' display='flex' className={classes.root}>
      <FormControlLabel
        labelPlacement='end'
        control={
          <PrettoSlider
            {...props}
            aria-labelledby='continuous-slider'
            getAriaValueText={value}
            valueLabelDisplay='auto'
            value={inputValue}
            name={name}
            onChange={handleChange}
          />
        }
        label={label}
      />
      {text && (
        <Typography variant='caption' style={{ marginLeft: '8px' }}>
          {text}
        </Typography>
      )}
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
