import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useObserver } from 'mobx-react-lite'
import _ from "lodash"

import NoContent from '../../../core/components/NoContent'
import { restaurantContext } from '../../Restaurant/contexts/restaurant_context'
import CardParty from '../components/CardParty'
import { partyContext } from '../contexts/party_context'

const BackgroundPartyList = styled.div`
  background-color: #F8CE28;
  height: ${ props => props.height > 3 ? "auto" : '100vh'};
`

const PartyList = () => {
  const router = useRouter()
  const contextParty = useContext(partyContext)
  const contextRestaurant = useContext(restaurantContext)
  
  useEffect(() => {
    (async () => {
      await contextParty.getParties(contextRestaurant.currentRestaurant.place_id)
    })()
  }, [contextParty])

  return useObserver(() => (
    <BackgroundPartyList className="overscroll-auto pt-4 pb-10 mb-6" height={_.size(contextParty.parties)}>
      {
        _.size(contextParty.parties) === 0 ? 
        <div className="flex justify-center flex-col w-full h-full">
          <NoContent text="ไม่มี Party ในร้านอาหารนี้" white />
        </div>
        :
        _.map(contextParty.parties, (data) => (
          <CardParty party={data} />
        ))
      }
    </BackgroundPartyList>
  ))
}

export default PartyList
