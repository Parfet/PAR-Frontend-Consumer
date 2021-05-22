import React from 'react'
import Image from 'next/image'
import StarIcon from '@material-ui/icons/Star';
import { IconButton } from '@material-ui/core';

import { RegularText } from '../../../../core/config/textStyle'
import { mockPartyMember } from '../../../../core/config/mockData.js'

interface Props {
  imageURL :string
  username :string
  admin? :boolean
  keyId? :number
  onClick :() => void
}

const PartyMember = (props: Props) => {
  const { username, imageURL, admin, onClick, keyId} = props

  const borderColor = 
    keyId === -1 ? 'border-cusYellow':
      keyId % 3 === 0 ? 'border-cusLightOrange' :
        keyId % 3 === 1 ? 'border-cusDarkRed' :
          keyId % 3 === 2 ? 'border-cusBrown' : ''

  return (
    <div className="flex flex-col w-1/3 mb-2 pr-2" onClick={onClick}>
      <div className={`text-center border-4 rounded-30 ${borderColor}`}>
        <Image
          alt={username}
          width={"80px"}
          height={"80px"}
          src={imageURL || mockPartyMember[0].imageURL}
          layout="responsive"
          objectFit="cover"
          className="rounded-25"
        />
      </div>
      <div className="text-center mt-2">
        {
          admin ? 
            <StarIcon style={{ color: "#FFD700"}} className="mb-1"/>
            : <></>
        }
        <RegularText className={`${admin ? 'mr-5 ml-1' : ''}`}>
          {username}
        </RegularText>
      </div>
    </div>
  )
}

export default PartyMember
