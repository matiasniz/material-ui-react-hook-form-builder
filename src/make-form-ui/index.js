import React, { useState, useEffect } from 'react'
import { Paper } from '@material-ui/core'
import BuildForm from './..'

export const MakeFormUI = (config) => {
  const [formData] = useState(() => {
    const data = Object.assign({}, config)
    return data
  })

  const handleSubmit = (formData) => {
    console.log('formData', formData)
  }

  return (
    <Paper>
      <BuildForm
        config={formData}
        onSubmit={handleSubmit}
        loading={false}
        submitErrors={{}}
        noBackButton={true}
        button={{
          size: 'medium',
          label: 'Guardar',
          position: 'center'
        }}
      />
    </Paper>
  )
}
