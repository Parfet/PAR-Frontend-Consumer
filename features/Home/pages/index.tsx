import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Image from 'next/image'
import { Button } from '@material-ui/core'

import { useUser } from '../../../core/context/auth_context';
import { Title, SubHeader } from '../../../core/config/textStyle';

const Background = styled.div`
  background-color: #F8CE28;
`

const Home = () => {
  const userContext = useUser();
  const router = useRouter()

  return (
    <Background className="pt-10 h-screen flex items-center justify-center flex-col space-y-10">
      <Button variant="contained" color="primary" onClick={() => router.push('/restaurant')}> Choose restaurant </Button>
      <Button variant="contained" color="primary" onClick={() => router.push('/party/me')}> My party</Button>
      <Button variant="contained" color="primary" onClick={() => router.push('/party/history')}> History</Button>
      <Button variant="contained" color="secondary" onClick={() => userContext.signout()}> sign out</Button>
    </Background>
  )
}

export default Home