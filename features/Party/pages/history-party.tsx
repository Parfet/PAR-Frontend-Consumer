import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import _ from "lodash"

import { useParty } from '../contexts/party_context'
import NoContent from '../../../core/components/NoContent'
import CardMyParty from '../components/CardMyParty'
import Loading from '../../../core/components/Loading'

const BackgroundPartyList = styled.div`
  background-color: #F8CE28;
  height: ${props => props.height > 3 ? "auto" : '100vh'};
`

const historyParty = () => {
  const partyContext = useParty()
  const [history, setHistory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      setHistory(await partyContext.getHistory())
      if (_.size(history) >= 0) setLoading(false)
    })()
  }, [])

  return (
    <BackgroundPartyList className="overscroll-auto pt-4 pb-10" height={_.size(history)}>
      {
        history == null || loading ?
          <Loading isWhite />
          :
          _.size(history) === 0 ?
            <div className="flex justify-center flex-col w-full h-full">
              <NoContent text="ไม่มีประวัติการเข้าร่วม" white />
            </div>
            :
            _.map(history, (data) => (
              <CardMyParty party={data} mode="history" />
            ))
      }
    </BackgroundPartyList>
  )
}

export default historyParty
