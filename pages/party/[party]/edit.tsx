import React, { useEffect } from 'react'

import Navigator from '../../../core/components/Navigator'
import CreateParty from '../../../features/Party/pages/create-party'
import { useParty } from '../../../features/Party/contexts/party_context'

const EditParty = () => {
  const partyContext = useParty()

  return (
    <Navigator
      yellow
      backTextButton='Back'
      backRoute={`/party/${partyContext.currentParty.party_id}`}
      middleText='Edit Party'
    >
      <CreateParty edit/>
    </Navigator>
  )
}

export default EditParty
