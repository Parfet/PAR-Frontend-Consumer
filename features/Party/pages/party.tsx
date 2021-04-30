import React, { useState, useEffect, useContext } from 'react'
import { useObserver } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import _ from 'lodash'

import { partyContext } from '../contexts/party_context'
import { mockPartyMember } from '../../../core/config/mockData.js'
import { RegularText } from '../../../core/config/textStyle'
import ConfirmModal from '../../../core/components/ConfirmModal'
import PartyMember from '../components/PartyPage/PartyMember'
import MemberModal from '../components/PartyPage/MemberModal'

type MemberDetail = {
  memberId: string
  imageURL: string
  username: string
  interestTag: string[]
  rating: number
}

const Party = () => {
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const [memberDetail, setMemberDetail] = useState<MemberDetail>()
  const [indexMember, setIndexMember] = useState(undefined)
  const contextParty = useContext(partyContext)
  const router = useRouter()
  const query = router.query
  
  useEffect(() => {
    console.log("🚀 ~ file: party.tsx ~ line 28 ~ Party ~ query", query)
    console.log(contextParty.currentParty)
    contextParty.getPartyByPartyId(query.party)
  }, [query.party, contextParty])

  const handleClickOpenMember = (memberDetail, index) => {
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
              imageURL={mockPartyMember[0].imageURL}
              username={contextParty.currentParty.members[0].username}
              onClick={() => handleClickOpenMember(mockPartyMember[0], undefined)}
              />
          </div>
          <div className="ml-2 my-4">
            <RegularText bold className="text-gray-500">สมาชิก</RegularText>
          </div>
          <div className="flex flex-wrap">
            {
              _.map(contextParty.currentParty.members, (data, index) => (
              <PartyMember 
                imageURL={mockPartyMember[0].imageURL}
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
