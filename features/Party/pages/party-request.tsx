import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { StatusCodes } from 'http-status-codes'
import _ from 'lodash'

import NoContent from '../../../core/components/NoContent'
import { SubHeader } from '../../../core/config/textStyle'
import { User } from '../../../core/constant/type'
import { Errors, PartyRequestStatus } from '../../../core/constant/enum'
import CardRequest from '../components/PartyPage/CardRequest'
import { useParty } from '../contexts/party_context'
import apiParty from '../services/apiParty'
import Loading from '../../../core/components/Loading'

const PartyRequest = () => {
  const router = useRouter()
  const partyContext = useParty()
  const [userList, setUserList] = useState<User[]>()
  const [partyName, setPartyName] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserJoinParty()
    setPartyName(partyContext.currentParty.party_name )
    if (_.size(userList) >= 0)setLoading(false)
  }, [])

  const getUserJoinParty = async () => {
    try {
      const res = await apiParty.getUserJoinParty(partyContext.currentParty.party_id)
      if (res.status === StatusCodes.OK) {
        setUserList(res.data.request)
      } else if (res.status === StatusCodes.NO_CONTENT) {
        setUserList([])
      }
    } catch (error) {
      if (error.response?.status === StatusCodes.FORBIDDEN) {
        const message = error.response?.data.message
        if (message === Errors.PERMISSION_DENIED) {
          router.push('/party/' + partyContext.currentParty.party_id)
        } else {
          router.push('/')
        }
      }
    }
  }

  const handleRequest = async (userId, status) => {
    try {
      const res = await apiParty.handleMemberRequest(partyContext.currentParty.party_id, userId, status)
      if (res.status === StatusCodes.OK) {
        getUserJoinParty()
      }
    } catch (error) {
      if (error.response?.status) {
        router.push('/party/' + partyContext.currentParty.party_id)
      }
    }
  }
  return (
    <div className="flex flex-col my-28 px-10 h-screen">
      <div className="ml-2 mb-4">
        <SubHeader>Party : { partyName }</SubHeader>
      </div>
      <div className="flex flex-col space-y-4">
        {
          loading ?
            <Loading />
          :
          _.size(userList) === 0 ?
            <div className="flex justify-center flex-col">
              <NoContent text="ยังไม่มีคนขอเข้าร่วม Party ของคุณ" />
            </div>
          :
          <>
            {  
              _.map(userList, (data, index) => (
                <CardRequest
                  userData={data}
                  acceptFunc={() => handleRequest(data.user_id, PartyRequestStatus.STATUS_ACCEPT)}
                  declineFunc={() => handleRequest(data.user_id, PartyRequestStatus.STATUS_DECLINE)}
                  keyId={index}
                  />
                  
              ))
            }
          </>
        }
      </div>
    </div>
  )
}

export default PartyRequest