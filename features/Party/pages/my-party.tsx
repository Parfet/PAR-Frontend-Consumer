import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useObserver } from 'mobx-react-lite'
import _ from "lodash"

import NoContent from '../../../core/components/NoContent'
import CardMyParty from '../components/CardMyParty'
import { partyContext } from '../contexts/party_context'

const BackgroundPartyList = styled.div`
  background-color: #F8CE28;
  height: ${ props => props.height > 3 ? "auto" : '100vh'};
`

const MyParty = () => {
  const router = useRouter()
  const contextParty = useContext(partyContext)

  useEffect(() => {
    contextParty.getParties("0e9ec195-6a9d-42c7-89b8-6df582723af0")
  }, [contextParty])

  return useObserver(() => (
    <BackgroundPartyList className="overscroll-auto pt-4 pb-10" height={_.size(contextParty.parties)}>
      {
        _.size(contextParty.parties) === 0 ?
          <div className="flex justify-center flex-col w-full h-full">
            <NoContent text="คุณไม่มี Party ที่เข้าร่วมในตอนนี้" white />
          </div>
          :
          _.map(contextParty.parties, (data) => (
            <CardMyParty party={data} />
          ))
      }
    </BackgroundPartyList>
  ))
}

export default MyParty