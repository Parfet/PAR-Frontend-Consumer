import React from 'react'
import { BottomNavigationAction, IconButton } from '@material-ui/core';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';

import Navigator from '../../../core/components/Navigator'
import PartyRequest from '../../../features/Party/pages/party-request'
import { useParty } from '../../../features/Party/contexts/party_context'

const RequestPage = () => {
  const partyContext = useParty()

  return (
    <Navigator
      yellow
      backTextButton='Back'
      backRoute={`/party/${partyContext.currentParty.party_id}`}
      middleText="Request"
    >
      <PartyRequest />
    </Navigator>
  )
}

export default RequestPage
