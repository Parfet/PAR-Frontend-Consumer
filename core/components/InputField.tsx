import React from 'react'
import { TextField } from '@material-ui/core';

import { RegularText } from '../config/textStyle'

interface Props {
  className?: string
  label: string
  children: JSX.Element,
}


const InputField = (props :Props) => {
  const { label, children, className } = props

  return (
    <div className={`flex flex-col justify-items-start mt-5 ${className}`}>
      <RegularText bold className="mb-1">{label}</RegularText>
      {children}
    </div>
  )
}

export default InputField
