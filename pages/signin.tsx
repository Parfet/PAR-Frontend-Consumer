import React from 'react'
import styled from 'styled-components'

import SignIn from '../features/Login/pages/sign-in';

const Background = styled.div`
  background-color: white;
  height: 100vh;
`

const SignInPages = () => {

  return (
    <Background className="pt-20">
      <SignIn />
    </Background>
  )
}

export default SignInPages