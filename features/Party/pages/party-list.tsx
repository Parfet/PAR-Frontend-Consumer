import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { Box, ListItem } from '@material-ui/core';

import CardParty from '../components/CardParty'

interface Props {
  
}

const BackgroundPartyList = styled.div`
  background-color: #F8CE28;
`

let datenow = dayjs().format("DD/MMM/YYYY HH:mm ")

const mockParty = [
  {
    partyName: "อะไรดี",
    restaurantName: "ติดมัน",
    timeToGo: datenow,
    promotion: "มา 4 จ่าย 3 ลด 100 บาท",
    interestTag: ["Technology", "Developer", "แมว", "หมา", "เรื่อยเปื่อย"],
    currentMember: 1,
    maxMember: 5
  },
  {
    partyName: "อะไรดี",
    restaurantName: "ติดมัน",
    timeToGo: datenow,
    promotion: "มา 4 จ่าย 3 ลด 100 บาท",
    interestTag: ["เรื่อยเปื่อย", "หมา", "แมว", "Technology", "Developer"],
    currentMember: 1,
    maxMember: 5
  },
  {
    partyName: "อะไรดี",
    restaurantName: "ติดมัน",
    timeToGo: datenow,
    promotion: "มา 4 จ่าย 3 ลด 100 บาท",
    interestTag: ["เรื่อยเปื่อย", "หมา", "แมว", "Technology", "Developer"],
    currentMember: 1,
    maxMember: 5
  },
  {
    partyName: "อะไรดี",
    restaurantName: "ติดมัน",
    timeToGo: datenow,
    promotion: "มา 4 จ่าย 3 ลด 100 บาท",
    interestTag: ["เรื่อยเปื่อย", "หมา", "แมว", "Technology", "Developer"],
    currentMember: 1,
    maxMember: 5
  },
  {
    partyName: "อะไรดี",
    restaurantName: "ติดมัน",
    timeToGo: datenow,
    promotion: "มา 4 จ่าย 3 ลด 100 บาท",
    interestTag: ["เรื่อยเปื่อย", "หมา", "แมว", "Technology", "Developer"],
    currentMember: 1,
    maxMember: 5
  },
  {
    partyName: "อะไรดี",
    restaurantName: "ติดมัน",
    timeToGo: datenow,
    promotion: "มา 4 จ่าย 3 ลด 100 บาท",
    interestTag: ["เรื่อยเปื่อย", "หมา", "แมว", "Technology", "Developer"],
    currentMember: 1,
    maxMember: 5
  },
]


const PartyList = () => {
  return (
    <>
      <BackgroundPartyList className="overscroll-auto pt-4 pb-10">
          {
            mockParty.map((data, index) => (
              <CardParty
                partyName={data.partyName}
                restaurantName={data.restaurantName} 
                timeToGo={data.timeToGo} 
                promotion={data.promotion}
                interestTag={data.interestTag}
                currentMember={data.currentMember}
                maxMember={data.maxMember}
                // className={`${index === mockParty.length ? "!mb-12" : "" }`}
              />
            ))
          }
      </BackgroundPartyList>
    </>
  )
}

export default PartyList
