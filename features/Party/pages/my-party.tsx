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
    contextParty.getPartyByUserId()
    return () => {
      contextParty.allMyParty = []
    }
  }, [contextParty])

  return useObserver(() => (
    <BackgroundPartyList className="overscroll-auto pt-4 pb-10" height={_.size(contextParty.allMyParty)}>
      {
        _.size(contextParty.allMyParty) === 0 ?
          <div className="flex justify-center flex-col w-full h-full">
            <NoContent text="คุณไม่มี Party ที่เข้าร่วมในตอนนี้" white />
          </div>
          :
          _.map(contextParty.allMyParty, (data, index) => (
            <>
              <CardMyParty party={data} key={index}/>
            </>
          ))
      }
    </BackgroundPartyList>
  ))
}

export default MyParty