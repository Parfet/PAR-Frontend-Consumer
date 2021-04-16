import React from 'react'
import { useRouter } from 'next/router'

import { mockPartyMember } from '../../../core/config/mockData.js'
import { RegularText } from '../../../core/config/textStyle'
import PartyMember from '../components/PartyMember'

const Party = () => {
  const router = useRouter()

  const partyName = router.query
  return (
    <div className="flex flex-col justify-center w-screen my-20 px-10">
      <div className="ml-2 mb-4">
        <RegularText bold className="text-gray-500">Party : {partyName.party}</RegularText>
      </div>
      <div>
        <PartyMember 
          admin
          imageURL={mockPartyMember[0].imageURL}
          username={mockPartyMember[0].username}
          />
      </div>
      <div className="ml-2 my-4">
        <RegularText bold className="text-gray-500">สมาชิก</RegularText>
      </div>
      <div className="flex flex-wrap">
        {
          mockPartyMember.map( (data, index) => (
            <PartyMember 
              imageURL={data.imageURL}
              username={data.username}
              key={index}
              keyId={index}
              />
          ))
        }
      </div>
    </div>
  )
}

export default Party
