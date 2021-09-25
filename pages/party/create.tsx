import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'

import Navigator from '../../core/components/Navigator'
import CreateParty from '../../features/Party/pages/create-party'
import { useUser } from '../../core/context/auth_context';

const cookies = new Cookies()

const CreatePartyPage = () => {
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
      backTextButton='Back'
      backRoute='/party'
      middleText='New Party'
    >
      <CreateParty />
    </Navigator>
  )
}

export default CreatePartyPage