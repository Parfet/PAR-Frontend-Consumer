import React, { useEffect, useState } from 'react'
import router from 'next/router'
import styled from 'styled-components'
import dayjs from 'dayjs'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Button, Modal } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddToCalendar from "@culturehq/add-to-calendar";
import _ from 'lodash'

import InputField from '../../../core/components/InputField'
import { NormalText, TinyText, SubHeader } from '../../../core/config/textStyle'
import { UIDateLayout } from '../../../core/constant/constant'
import { PartyType } from '../../../core/constant/enum'
import { PartyTypeThai } from '../../../core/constant/constant'
import { useUser } from '../../../core/context/auth_context'
import { useParty } from '../contexts/party_context'

const CreateButton = withStyles(() => ({
  root: {
    borderRadius: 25,
    backgroundColor: "#F8CE28",
    '&:hover': {
      backgroundColor: "#F8CE28",
    },
  },
}))(Button)

const Background = styled.div`
  height: 90vh;
`

const PartyInfo = () => {
  const partyContext = useParty()
  const userContext = useUser()
  
  useEffect(() => {
    console.log("🚀 ~ file: party-info.tsx ~ line 19 ~ useEffect ~ partyContext.currentParty", partyContext.currentParty)
    if(!partyContext.currentParty){
      router.push('/party/me')
    }
  }, [])

  const goToEditParty = () => {
    router.push(`/party/${partyContext.currentParty.party_id}/edit`)
  }

  return partyContext.currentParty ? (
    <Background className="overscroll-auto px-10 pt-8 flex flex-1 flex-col justify-between">
      <div className="h-5/6">
        <InputField label="ชื่อปาร์ตี้">
          <NormalText>{partyContext.currentParty.party_name}</NormalText>
        </InputField>
        <InputField label="หัวข้อที่สนใจคุยในปาร์ตี้">
          <NormalText>{partyContext.currentParty.interested_topic}</NormalText>
        </InputField>
        <InputField label="ร้านอาหาร">
          <NormalText>{partyContext.currentParty.restaurant.restaurant_name}</NormalText>
        </InputField>
        <InputField label="Tag ที่สนใจ">
          <div className="flex flex-wrap justify-start h-full">
            {
              _.map(partyContext.currentParty.interest_tags, (data, index) => (
                <>
                  {
                    <TinyText className="flex flex-wrap content-center bg-gray-300 rounded-5 px-3 py-1 h-7 mr-2 mt-2">
                      {data.label}
                    </TinyText>
                  }
                </>
              ))
            }
          </div>
        </InputField>
        <div className="flex flex-row  justify-between">
          <InputField label="ประเภทของปาร์ตี้" className="w-1/2">
            <NormalText>
              { partyContext.currentParty.party_type === PartyType.PRIVATE ? PartyTypeThai.PRIVATE : PartyTypeThai.PUBLIC }
            </NormalText>
          </InputField>
          <InputField label="จำนวนคนสูงสุด" className="w-1/2">
            <NormalText>{partyContext.currentParty.max_member } คน</NormalText>
          </InputField>
        </div>
        <InputField label="วันและเวลาที่จะไป">
          <>
            <div className="flex flex-row justify-between">
              <div className="self-center w-1/2">
                <NormalText>
                  {dayjs(partyContext.currentParty.schedule_time).format(UIDateLayout.TIMESTAMP_WITH_DAY)}
                </NormalText>
              </div>
              <div className="w-1/2">
                <AddToCalendar
                  filename={partyContext.currentParty.party_name}
                  event={{
                    name: partyContext.currentParty.party_name,
                    details: `คุณมีนัดหมายในการไปร่วมปาร์ตี้กับเพื่อน ๆ ในปาร์ตี้ ${partyContext.currentParty.party_name} 
                      สถานที่ในการไปรับประทาน คือ ${partyContext.currentParty.restaurant.restaurant_name} ในเวลา ${dayjs(partyContext.currentParty.schedule_time).format(UIDateLayout.TIMESTAMP_WITH_DAY)}`,
                    location: partyContext.currentParty.restaurant_name ?? "Mock",
                    startsAt: dayjs(partyContext.currentParty.schedule_time).toISOString(),
                    endsAt: dayjs(partyContext.currentParty.schedule_time).add(2, 'hour').toISOString()
                  }}>
                  <div>
                    <CalendarTodayIcon style={{ color: "#495dd3" }}/>
                    <span className="ml-2">เพิ่มลงในปฎิทิน</span>
                  </div>
                </AddToCalendar>
              </div>

            </div>
          </>
        </InputField>
        <InputField label="Line OpenChat" >
          <>
          {
            partyContext.currentParty.open_chat_link ?
            <Button href={partyContext.currentParty.open_chat_link} color="primary" className="justify-start pl-0">
              เข้าร่วม Line OpenChat
            </Button>
            : <NormalText>เจ้าของปาร์ตี้ยังไม่ได้เพิ่ม Line OpenChat</NormalText>
          } 
          </>
        </InputField>
      </div>
      {
        userContext.userData.username == partyContext.currentParty.head_party.username ?
          <div className="flex justify-center mb-1">
            <CreateButton variant="contained" onClick={() => goToEditParty()}>
              <SubHeader className="text-white">
                แก้ไขปาร์ตี้
              </SubHeader>
            </CreateButton> 
          </div> 
        : <></>
      }
    </Background>
  ) : <></>
}

export default PartyInfo
