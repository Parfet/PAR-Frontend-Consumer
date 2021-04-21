import React from 'react'
import { useRouter } from 'next/router'

import CardRequest from '../components/CardRequest'
import { mockPartyMember } from '../../../core/config/mockData.js'
import { SubHeader } from '../../../core/config/textStyle'

const PartyRequest = () => {
  const router = useRouter()

  const partyName = router.query

  const acceptFunc = (index) => {
    console.log(index)
  }

  const declineFunc = (index) => {
    console.log(index)
  }

  return (
    <div className="flex flex-col justify-center w-screen my-20 px-10">
      <div className="ml-2 mb-4">
        <SubHeader>Party : {partyName.party}</SubHeader>
      </div>
      <div className="flex flex-col space-y-4">
        {
          mockPartyMember.map((data, index) => (
            <CardRequest
              imageURL={data.imageURL}
              username={data.username}
              rating={data.rating}
              acceptFunc={() => acceptFunc(index)}
              declineFunc={() => declineFunc(index)}
              keyId={index}
            />
          ))
        }
      </div>
    </div>
  )
}

export default PartyRequest