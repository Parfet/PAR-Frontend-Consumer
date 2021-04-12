import React from 'react'
import styled from 'styled-components'

import { mockParty } from '../../../core/config/mockData'
import CardParty from '../components/CardParty'

const BackgroundPartyList = styled.div`
  background-color: #F8CE28;
`

const PartyList = () => {
  return (
    <BackgroundPartyList className="overscroll-auto pt-4 pb-10">
        {
          mockParty.map((data, index) => (
            <CardParty
              partyId={data.partyId}
              partyName={data.partyName}
              restaurantName={data.restaurantName} 
              timeToGo={data.timeToGo} 
              promotion={data.promotion}
              interestTag={data.interestTag}
              currentMember={data.currentMember}
              maxMember={data.maxMember}
              partyType={data.partyType}
            />
          ))
        }
    </BackgroundPartyList>
  )
}

export default PartyList
