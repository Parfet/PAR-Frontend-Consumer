import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import _ from "lodash"

import NoContent from '../../../core/components/NoContent'
import CardParty from '../components/CardParty'
import { useParty } from '../contexts/party_context'
import { useRestaurant } from '../../Restaurant/contexts/restaurant_context'

const BackgroundPartyList = styled.div`
  background-color: #F8CE28;
  height: ${ props => props.height > 3 ? "auto" : '100vh'};
`

const PartyList = () => {
  const router = useRouter()
  const partyContext = useParty()
  const restaurantContext = useRestaurant()
  
  useEffect(() => {
    (async () => {
      await partyContext.getParties(restaurantContext.currentRestaurant.place_id)
    })()
  }, [])

  return (
    <BackgroundPartyList className="overscroll-auto pt-4 pb-10 mb-6" height={_.size(partyContext.parties)}>
      {
        _.size(partyContext.parties) === 0 ? 
        <div className="flex justify-center flex-col w-full h-full">
          <NoContent text="ไม่มี Party ในร้านอาหารนี้" white />
        </div>
        :
        _.map(partyContext.parties, (data) => (
          <CardParty party={data} />
        ))
      }
    </BackgroundPartyList>
  )
}

export default PartyList
