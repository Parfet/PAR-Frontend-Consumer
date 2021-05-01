import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { StatusCodes } from 'http-status-codes'
import _ from 'lodash'

import NoContent from '../../../core/components/NoContent'
import { SubHeader } from '../../../core/config/textStyle'
import { User } from '../../../core/constant/type'
import { Errors } from '../../../core/constant/enum'
import CardRequest from '../components/PartyPage/CardRequest'
import { partyContext } from '../contexts/party_context'
import apiParty from '../services/apiParty'

const PartyRequest = () => {
  const router = useRouter()
  const contextParty = useContext(partyContext)
  const [userList, setUserList] = useState<User[]>()

  useEffect(() => {
    getUserJoinParty()
  }, [])

  const getUserJoinParty = async () => {
    try {
      const res = await apiParty.getUserJoinParty(contextParty.currentParty.party_id)
      if (res.status === StatusCodes.OK) {
        setUserList(res.data.request)
        console.log("🚀 ~ file: party-request.tsx ~ line 35 ~ getUserJoinParty ~ res.data.request", res.data.request)
      } else if (res.status === StatusCodes.NO_CONTENT) {
        setUserList([])
      }
    } catch (error) {
      if (error.response?.status === StatusCodes.BAD_REQUEST) {
        const message = error.response?.data.message
        if (message === Errors.PERMISSION_DENIED) {
          router.push('/party/' + contextParty.currentParty.party_id)
        } else {
          router.push('/')
        }
      }
    }
  }

  const acceptFunc = (index) => {
    console.log(index)
  }

  const declineFunc = (index) => {
    console.log(index)
  }

  return (
    <div className="flex flex-col my-28 px-10 h-screen">
      <div className="ml-2 mb-4">
        <SubHeader>Party : {contextParty.currentParty.party_name || ''}</SubHeader>
      </div>
      <div className="flex flex-col space-y-4">
        {
          _.size(userList) === 0 ?
            <div className="flex justify-center flex-col">
              <NoContent text="ยังไม่มีคนขอเข้าร่วม Party ของคุณ" />
            </div>
          :
          <>
            {  
              _.map(userList, (data, index) => (
              <CardRequest
                imageURL={data.image_url}
                username={data.username}
                rating={data.rating}
                acceptFunc={() => acceptFunc(index)}
                declineFunc={() => declineFunc(index)}
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