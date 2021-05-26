import React, { useContext, useEffect } from 'react'

import Navigator from '../../../core/components/Navigator'
import CreateParty from '../../../features/Party/pages/create-party'
import { partyContext } from '../../../features/Party/contexts/party_context'

const EditParty = () => {
  const contextParty = useContext(partyContext)

  return (
    <Navigator
      yellow
      backTextButton='Back'
      backRoute={`/party/${contextParty.currentParty.party_id}`}
      middleText='Edit Party'
    >
      <CreateParty edit/>
    </Navigator>
  )
}

export default EditParty
