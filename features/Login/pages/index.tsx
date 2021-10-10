import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Image from 'next/image'
import Cookies from 'universal-cookie'

import { useUser } from '../../../core/context/auth_context';
import { Title, SubHeader } from '../../../core/config/textStyle';
import SignInButton from '../components/SignInButton';

const cookies = new Cookies()

const Background = styled.div`
  background-color: white;
  height: 100vh;
`

const SignIn = () => {
  const userContext = useUser();

  return (
    <Background className="pt-10">
      <div className="flex justify-center mb-16">
        <Image
          alt="Parfet Logo"
          src="/images/tran_logo_parfet_512.png"
          width={"192px"}
          height={"192px"}
        />
      </div>
      <Title className="text-center mb-16"> เข้าสู่ระบบ </Title>
      <div className="flex flex-col items-center justify-center space-y-6">
        <SignInButton
          onClick={() => userContext.signinWithGoogle()}
          text="เข้าสู่ระบบด้วย google"
          image="/images/google.png"
        />
        <SignInButton
          onClick={() => userContext.signinWithFacebook()}
          text="เข้าสู่ระบบด้วย facebook"
          image="/images/facebook.png"
          bgColor="#1676F1"
        />
        <SignInButton
          onClick={() => userContext.signinWithTwitter()}
          text="เข้าสู่ระบบด้วย twitter"
          image="/images/twitter.png"
          bgColor="#1C9BF3"
        />
      </div>
    </Background>
  )
}

export default SignIn