import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

const CusStarIcon = styled(StarIcon) <IsWhite>`
  color: ${(iw: IsWhite) => iw.white ? 'white' : 'black'};
  font-size:24px;
`

const CusStarOutlineIcon = styled(StarOutlineIcon) <IsWhite>`
  color: ${(iw: IsWhite) => iw.white ? 'white' : 'black'};
  font-size:24px;
`

interface IsWhite {
  white? :boolean
}

interface Props {
  showEmpty? :boolean
  white? :boolean
  rating :number
}

const RatingStar = (props: Props) => {
  const [ratingStar, setRatingStar] = useState([])
  const { rating = 5, white, showEmpty } = props

  useEffect(() => {
    addStarToRatingStar()
  }, [])

  const addStarToRatingStar = () => {
    let countStar
    for ( countStar = 0 ; countStar < rating ; countStar++ ) {
      if (countStar >= 5){
        break;
      }
      setRatingStar(ratingStar => [...ratingStar, <CusStarIcon white={white} key={countStar}/>])
    }
    if (showEmpty){
      addEmptyStarToRatingStar(countStar)
    }
  }

  const addEmptyStarToRatingStar = (countStar :number) => {
    for (countStar ; countStar < 5 ; countStar++) {
      setRatingStar(ratingStar => [...ratingStar, <CusStarOutlineIcon white={white} key={countStar}/>])
    }
  }

  return (
    <div className="flex flex-row space-x-0">
      {ratingStar}
    </div>
  )
}

export default RatingStar
