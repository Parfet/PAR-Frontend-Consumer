import React, { useState, useEffect, useContext } from 'react'
import { useObserver, Observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import _ from 'lodash'

import { partyContext } from '../contexts/party_context'
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
  const contextParty = useContext(partyContext)
  
  useEffect(() => {
  }, [contextParty])

  const handleClickOpenMember = (memberDetail, index) => {
    if (memberDetail.user_id === contextParty.currentParty.head_party){
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

  return useObserver(() => (
    <>
    {
      contextParty.currentParty === undefined ?
        <>
          {/* 
            TODO  handle loading
          */}
        </>
        :
        <div className="flex flex-col justify-center w-screen my-20 px-10">
          <div className="ml-2 mb-4">
              <RegularText bold className="text-gray-500">Party : {contextParty.currentParty.party_name}</RegularText>
          </div>
          <div>
            <PartyMember 
              admin
                imageURL={_.get(contextParty.currentParty.head_party, 'image_url')}
              username={_.get(contextParty.currentParty.head_party, 'username')}
              onClick={() => handleClickOpenMember(contextParty.currentParty.head_party, -1)}
              keyId={-1}
              />
          </div>
          <div className="ml-2 my-4">
            <RegularText bold className="text-gray-500">สมาชิก</RegularText>
          </div>
          <div className="flex flex-wrap">
            {
              _.map(contextParty.currentParty.members, (data, index) => (
                data.user_id === contextParty.currentParty.head_party.user_id ?
                <></>
                :
                <PartyMember 
                  imageURL={data.image_url}
                  username={data.username}
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
  ))
}

export default Party
