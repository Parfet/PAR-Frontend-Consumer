import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Image from 'next/image'

import { useAuth } from '../../../core/config/auth';
import { Title, SubHeader } from '../../../core/config/textStyle';
import SignInButton from '../components/SignInButton';

const Background = styled.div`
  background-color: white;
  height: 100vh;
`

const SignIn = () => {
  const auth = useAuth();

  return (
    <Background className="pt-20">
      <div className="flex justify-center mb-16">
        <Image
          alt="Parfet Logo"
          src="/images/logo_parfet_192.png"
          width={"192px"}
          height={"192px"}
        />
      </div>
      <Title className="text-center mb-16"> เข้าสู่ระบบ </Title>
      <div className="flex flex-col items-center justify-center space-y-6">
        <SignInButton
          onClick={() => auth.signinWithGoogle('/')}
          text="เข้าสู่ระบบด้วย google"
          image="/images/google.png"
        />
        <SignInButton
          onClick={() => auth.signinWithFacebook('/')}
          text="เข้าสู่ระบบด้วย facebook"
          image="/images/facebook.png"
          bgColor="#1676F1"
        />
        <SignInButton
          onClick={() => auth.signinWithTwitter('/')}
          text="เข้าสู่ระบบด้วย twitter"
          image="/images/twitter.png"
          bgColor="#1C9BF3"
        />
      </div>
    </Background>
  )
}

export default SignIn