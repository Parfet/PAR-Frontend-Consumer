import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useObserver } from 'mobx-react-lite'
import { toJS } from 'mobx';
import _ from "lodash"

import { mockParty } from '../../../core/config/mockData'
import CardParty from '../components/CardParty'
import { partyContext } from '../contexts/party_context'

const BackgroundPartyList = styled.div`
  background-color: #F8CE28;
`

const PartyList = () => {
  const contextParty = useContext(partyContext)

  useEffect(() => {
    contextParty.getParties()
  }, [contextParty])

  return useObserver(() => (
    <BackgroundPartyList className="overscroll-auto pt-4 pb-10">
      {
        _.map(contextParty.parties, (data) => (
          <CardParty party={data} />
        ))
      }
    </BackgroundPartyList>
  ))
}

export default PartyList
