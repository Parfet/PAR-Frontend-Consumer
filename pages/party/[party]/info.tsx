import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'

import Navigator from '../../../core/components/Navigator'
import PartyInfo from '../../../features/Party/pages/party-info'
import { useUser } from '../../../core/context/auth_context';

const cookies = new Cookies()

const PartyInfoPage = () => {
  const router = useRouter()
  const userContext = useUser();

  useEffect(() => {
    (async () => {
      if (userContext.userData === null) {
        if (cookies.get("access_token")) {
          await userContext.getUserData()
        } else {
          router.push('/signin')
        }
      }
    })()
  }, [])

  return (
    <Navigator
      yellow
      backTextButton='กลับ'
      backRoute={() => router.back()}
      middleText='ข้อมูลปาร์ตี้'
    >
      <PartyInfo />
    </Navigator>
  )
}

export default PartyInfoPage