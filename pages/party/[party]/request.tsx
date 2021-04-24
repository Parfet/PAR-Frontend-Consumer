import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { BottomNavigationAction, IconButton } from '@material-ui/core';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';

import Navigator from '../../../core/components/Navigator'
import PartyRequest from '../../../features/Party/pages/party-request'

const PartyPage = () => {
  const router = useRouter()

  const partyName = router.query

  return (
    <Navigator
      yellow
      backTextButton='Back'
      backRoute={`/party/${partyName.party}`}
      middleText="Request"
    >
      <PartyRequest />
    </Navigator>
  )
}

export default PartyPage
