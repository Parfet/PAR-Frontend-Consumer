import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'

import Navigator from '../../core/components/Navigator'
import HistoryParty from '../../features/Party/pages/history-party'
import { useUser } from '../../core/context/auth_context';

const cookies = new Cookies()

const HistoryPage = () => {
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
      backTextButton='หน้าหลัก'
      backRoute={() => router.push('/')}
      middleText='ประวัติ'
    >
      <HistoryParty />
    </Navigator>
  )
}

export default HistoryPage