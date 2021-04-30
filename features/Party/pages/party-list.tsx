import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useObserver } from 'mobx-react-lite'
import { toJS } from 'mobx';
import _ from "lodash"
import CancelIcon from '@material-ui/icons/Cancel';

import { SubTitle } from '../../../core/config/textStyle'
import CardParty from '../components/CardParty'
import { partyContext } from '../contexts/party_context'
import { restaurantContext } from '../../Restaurant/contexts/restaurant_context'

const BackgroundPartyList = styled.div`
  background-color: #F8CE28;
  height: 100vh;
`

const PartyList = () => {
  const router = useRouter()
  const contextParty = useContext(partyContext)
  const contextRestaurant = useContext(restaurantContext)
  
  useEffect(() => {
    contextParty.getParties(contextRestaurant.currentRestaurant.restaurant_id)
  }, [contextParty])

  return useObserver(() => (
    <BackgroundPartyList className="overscroll-auto pt-4 pb-10 mb-6">
      {
        _.size(contextParty.parties) === 0 ? 
          <div className="flex justify-center flex-col w-full h-full">
            <div className="flex justify-center mb-4">
              <CancelIcon style={{ color: 'white', fontSize:'64px' }} />
            </div>
            <SubTitle className="self-center mb-12" white bold>
              ไม่มี Party ในร้านอาหารนี้
            </SubTitle>
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
