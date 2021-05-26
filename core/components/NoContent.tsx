import React from 'react'
import styled from 'styled-components'
import CancelIcon from '@material-ui/icons/Cancel';

import { SubTitle } from '../config/textStyle'

const NewCancle = styled(CancelIcon)`
  color: ${ props => props.white ? 'white' : 'black'};
  font-size: 64px;
`

interface Props {
  text: string
  white?: boolean
}

const NoContent = (props: Props) => {
  const { text, white } = props
  return (
    <>
      <div className="flex justify-center mb-4">
        <NewCancle  white={white}/>
      </div>
      <SubTitle className="self-center mb-12" white={white} bold>
        {text}
      </SubTitle>
    </>
  )
}

export default NoContent
