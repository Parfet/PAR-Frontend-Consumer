import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core'

import { NormalText } from '../../../core/config/textStyle'

const ButtonWithColor = styled(Button)`
  background-color: ${ (props) => props.bgColor ? props.bgColor : "" };
  color: ${ (props) => props.bgColor ? "white" : "black" };
  border: ${ (props) => props.bgColor ? "" : "1px solid black" };
`
interface Props {
  text?: string
  image: string
  bgColor?: string
  onClick: (value: string) => void
}

const SignInButton = (props: Props) => {
  const { text, image, onClick, bgColor } = props
  return (
    <ButtonWithColor 
      onClick={onClick} 
      className="flex rounded-5 w-72 justify-start pl-4"
      bgColor={bgColor}
      >
      <Image
        alt={text}
        src={image}
        width={"32px"}
        height={"32px"}
      />
      <div className="ml-4">
        <NormalText
          white={bgColor ? "white" : ""}
        >
          {text}
        </NormalText>
      </div>
    </ButtonWithColor>
  )
}

export default SignInButton
