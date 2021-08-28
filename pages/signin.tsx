import React from 'react'
import styled from 'styled-components'

import SignIn from '../features/Login/pages';

const Background = styled.div`
  background-color: white;
  height: 100vh;
`

const SignInPages = () => {

  return (
    <Background>
      <SignIn />
    </Background>
  )
}

export default SignInPages