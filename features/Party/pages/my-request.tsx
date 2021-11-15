import React, { useEffect, useState} from 'react'
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

const myRequest = () => {
  const partyContext = useParty()
  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      setRequest(await partyContext.getMyPartyRequest())
      if (_.size(request) >= 0) setLoading(false)
    })()
  }, [])

  return (
    <BackgroundPartyList className="overscroll-auto pt-4 pb-10" height={_.size(request)}>
      {
        request == null || loading  ?
          <Loading isWhite />
          :
          _.size(request) === 0 ?
            <div className="flex justify-center flex-col w-full h-full">
              <NoContent text="ไม่มีคำขอเข้าร่วม" white />
            </div>
            :
            _.map(request, (data) => (
              <CardMyParty party={data} mode="request" />
            ))
      }
    </BackgroundPartyList>
  )
}

export default myRequest
