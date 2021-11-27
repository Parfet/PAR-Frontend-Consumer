import React, { useState, useEffect} from 'react'
import styled from 'styled-components'
import Cookies from 'universal-cookie'

import SignIn from '../features/Login/pages';
import Loading from '../core/components/Loading'
import { useUser } from '../core/context/auth_context'

const cookies = new Cookies()

const Background = styled.div`
  background-color: white;
  height: 100vh;
`

const SignInPages = () => {
  const userContext = useUser()

  return (
    <Background>
      {
        userContext.loading ? <Loading />
        : <SignIn />
      }
    </Background>
  )
}

export default SignInPages