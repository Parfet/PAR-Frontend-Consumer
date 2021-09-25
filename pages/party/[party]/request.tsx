import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'

import Navigator from '../../../core/components/Navigator'
import PartyRequest from '../../../features/Party/pages/party-request'
import { useParty } from '../../../features/Party/contexts/party_context'
import { useUser } from '../../../core/context/auth_context';

const cookies = new Cookies()

const RequestPage = () => {
  const router = useRouter()
  const partyContext = useParty()
  const userContext = useUser();
  const [partyId, setPartyId] = useState('')

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
    setPartyId(partyContext.currentParty.party_id)
  }, [])

  return (
    <Navigator
      yellow
      backTextButton='Back'
      backRoute={`/party/${partyId}`}
      middleText="Request"
    >
      <PartyRequest />
    </Navigator>
  )
}

export default RequestPage
