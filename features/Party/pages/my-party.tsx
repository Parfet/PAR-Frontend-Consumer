import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import _ from "lodash"

import NoContent from '../../../core/components/NoContent'
import CardMyParty from '../components/CardMyParty'
import { useParty } from '../contexts/party_context'
import Loading from '../../../core/components/Loading'

const BackgroundPartyList = styled.div`
  background-color: #F8CE28;
  height: ${ props => props.height > 3 ? "auto" : '100vh'};
`

const MyParty = () => {
  const router = useRouter()
  const partyContext = useParty()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      await partyContext.getPartyByUserId()
      if (partyContext.allMyParty) setLoading(false)
    })()
  }, [])

  return (
    <BackgroundPartyList className="overscroll-auto pt-4 pb-10" height={_.size(partyContext.allMyParty)}>
      {
        loading ?
          <Loading isWhite />
        :
        _.size(partyContext.allMyParty) === 0 ?
          <div className="flex justify-center flex-col w-full h-full">
            <NoContent text="คุณไม่มี Party ที่เข้าร่วมในตอนนี้" white />
          </div>
          :
          _.map(partyContext.allMyParty, (data, index) => (
            <>
              <CardMyParty party={data} key={index}/>
            </>
          ))
      }
    </BackgroundPartyList>
  )
}

export default MyParty