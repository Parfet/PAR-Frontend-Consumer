import React, { useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core'

import { NormalText } from '../../../core/config/textStyle'

const ButtonWithColor = styled(Button)`
  background-color: ${ (props) => props.bgColor ? props.bgColor : "" };
  border: ${ (props) => props.bgColor ? "" : "1px solid black" };
`

interface Props {
  text?: string
  image: string
  bgColor?: string
  onClick: (value: string) => void
}

const SignInButton = (props: Props) => {
  const [textBlack, setTextBlack] = useState(true)
  const { text, image, onClick, bgColor } = props

  const handleMouseOver = () => {
    setTextBlack(false);
  }

  const handleMouseOut = () => {
    setTextBlack(true);
  }

  return (
    <ButtonWithColor 
      onClick={onClick} 
      onMouseOver={() => handleMouseOver()}
      onMouseOut={() => handleMouseOut()}
      className="flex rounded-5 w-72 justify-start pl-4"
      bgColor={bgColor}
      >
      <Image
        alt={text}
        src={image}
        width={"32px"}
        height={"32px"}
      />
      <NormalText
        className="ml-4"
        white={bgColor ? textBlack : false}
      >
        {text}
      </NormalText>
    </ButtonWithColor>
  )
}

export default SignInButton
