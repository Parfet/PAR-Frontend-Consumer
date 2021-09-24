import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import _ from 'lodash'

import { useParty } from '../contexts/party_context'
import { mockPartyMember } from '../../../core/config/mockData.js'
import { RegularText } from '../../../core/config/textStyle'
import { User } from '../../../core/constant/type'
import PartyMember from '../components/PartyPage/PartyMember'
import MemberModal from '../components/PartyPage/MemberModal'

const Party = () => {
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const [memberDetail, setMemberDetail] = useState<User>()
  const [indexMember, setIndexMember] = useState<any>()
  const [isAdmin, setIsAdmin] = useState(false);
  const partyContext = useParty()
  
  useEffect(() => {
  }, [])

  const handleClickOpenMember = (memberDetail, index) => {
    if (memberDetail.user_id === partyContext.currentParty.head_party){
      setIsAdmin(true)
    }else{
      setIsAdmin(false)
    }
    setIndexMember(index)
    setMemberDetail(memberDetail)
    setOpenMemberModal(true)
  }

  const valueFromMemberModal = (value) => {
    setOpenMemberModal(value)
  }

  return (
    <>
    {
        !partyContext.currentParty ?
        <>
          {/* 
            TODO  handle loading
          */}
        </>
        :
        <div className="flex flex-col justify-center w-screen my-20 px-10">
          <div className="ml-2 mb-4">
              <RegularText bold className="text-gray-500">Party : {partyContext.currentParty.party_name}</RegularText>
          </div>
          <div>
            <PartyMember 
              admin
                imageURL={partyContext.currentParty.head_party ? partyContext.currentParty.head_party.image_url : ''}
              username={partyContext.currentParty.head_party ? partyContext.currentParty.head_party.display_name :  'display_name'}
              onClick={() => handleClickOpenMember(partyContext.currentParty.head_party, -1)}
              keyId={-1}
              />
          </div>
          <div className="ml-2 my-4">
            <RegularText bold className="text-gray-500">สมาชิก</RegularText>
          </div>
          <div className="flex flex-wrap">
            {
              _.map(partyContext.currentParty.members, (data, index) => (
                data.username === partyContext.currentParty.head_party.username ?
                <></>
                :
                <PartyMember 
                  imageURL={data.image_url}
                  username={data.display_name}
                  key={index}
                  keyId={index}
                  onClick={() => handleClickOpenMember(data, index)}
                  />
                ))
            }
          </div>
        </div>
    }
    {
      openMemberModal ?
        <MemberModal
          isAdmin={isAdmin}
          showModal={openMemberModal}
          callBackToMemberParty={valueFromMemberModal}
          memberDetail={memberDetail}
          indexMember={indexMember}
        />
        : <></>
    }
    </>
  )
}

export default Party
