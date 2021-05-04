import React from 'react'
import Image from 'next/image'
import { Card } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import { SubHeader } from '../../../../core/config/textStyle'
import RatingStar from '../../../../core/components/RatingStar'

interface Props {
  imageURL :string
  username :string
  rating :number
  acceptFunc :() => void
  declineFunc :() => void
  keyId :number
}

const CardRequest = (props: Props) => {
  const { username, imageURL, rating, acceptFunc, declineFunc, keyId} = props

  const bgColor = 
    keyId % 3 === 0 ? 'bg-cusLightOrange' :
      keyId % 3 === 1 ? 'bg-cusDarkRed' : 'bg-cusBrown' 

  return (
    <Card className={`flex space-x-2 p-3 ${bgColor}`} variant="outlined">
      <div className="w-1/4">
        <Image
          alt={username}
          width={"80px"}
          height={"80px"}
          src={imageURL || "/images/tidmun.webp"}
          layout="responsive"
          objectFit="cover"
          className="rounded-25"
          />
      </div>
      <div className="w-2/4 flex flex-col content-center">
        <SubHeader white bold className="mt-2 mb-1"> {username} </SubHeader>
        <RatingStar white rating={rating} />
      </div>
      <div className="w-1/4 flex flex-wrap content-center space-x-1">
        <CheckCircleIcon
          style={{ backgroundColor: '#34C759', color: 'white', fontSize: '28px', borderRadius: 30 }}
          onClick={acceptFunc}
        />
        <CancelIcon 
          style={{ backgroundColor: '#F4757E', color: 'white', fontSize: '28px', borderRadius: 30 }}
          onClick={declineFunc}
          />
      </div>
    </Card>
  )
}

export default CardRequest
