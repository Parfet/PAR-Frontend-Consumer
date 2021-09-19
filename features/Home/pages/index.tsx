import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Image from 'next/image'

import { useAuth } from '../../../core/config/auth';
import { Title, SubHeader } from '../../../core/config/textStyle';

const Background = styled.div`
  background-color: white;
  height: 100vh;
`

const Home = () => {
  const auth = useAuth();

  return (
    <Background className="pt-10">
      <button onClick={() => auth.signout()}> sign out</button>
    </Background>
  )
}

export default Home