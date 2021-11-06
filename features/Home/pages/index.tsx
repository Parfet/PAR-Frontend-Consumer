import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import _, { hasIn } from 'lodash'
import { Button } from '@material-ui/core'

import { useUser } from '../../../core/context/auth_context';
import { Party } from '../../../core/constant/type';
import NoContent from '../../../core/components/NoContent'
import { useParty } from '../../Party/contexts/party_context';
import CardMyParty from '../../Party/components/CardMyParty';
import PartyModal from '../../Party/components/PartyModal';
import DeclineModal from '../../Party/components/RequestStatus/DeclineModal';
import { Title, SubHeader, NormalText } from '../../../core/config/textStyle';

const Background = styled.div`
  background-color: #F8CE28;
  height: 95vh;
`

const ButtonWithColor = styled(Button)`
  background-color: ${(props: ButtonProps) => props.color ? props.color : "#BD470A" };
`
interface ButtonProps {
  color?: string
}

const Home = () => {
  const userContext = useUser();
  const partyContext = useParty();
  const router = useRouter()
  const [party, setParty] = useState<Party>()
  const [openModal, setOpenModal] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);
  const [declineText, setDeclineText] = useState("ไม่มีที่คุณสามารถเข้าร่วมได้");
  
  useEffect(() => {
    (async () => {
      await partyContext.getPartyByUserId()
      let error = await userContext.getLocation()
      if (error){
        setDeclineText('กรุณาเปิดการเข้าถึงตำแหน่งที่ตั้งของคุณ')
        setOpenDecline(true)
      }
    })()
  }, [])

  const handleRandom = async () => {
    if (userContext.location.lat == 0 && userContext.location.lng == 0){
      let error = await userContext.getLocation()
      if (error) {
        setDeclineText('กรุณาเปิดการเข้าถึงตำแหน่งที่ตั้งของคุณ')
        setOpenDecline(true)
      }
    }else{
      let newParty = await partyContext.randomParty(await userContext.location)
      if (newParty && newParty != null) {
        setParty(newParty)
        setOpenModal(true)
      } else {
        setOpenDecline(true)
        setDeclineText("ไม่มีที่คุณสามารถเข้าร่วมได้")
      }
    }
  }

  const valueFromPartyModal = (value) => {
    setOpenModal(value)
    setOpenDecline(value)
  }

  return  (
    <Background className="pt-10 overflow-hidden">
      <div className="flex justify-between px-8">
        <SubHeader bold>ปาร์ตี้ของของคุณ</SubHeader>
        <NormalText className="text-black pt-1 underline" onClick={() => router.push('/party/me')}> ดูทั้งหมด </NormalText>
      </div>
      {
        _.size(partyContext.allMyParty) === 0 ?
          <div className="flex justify-center flex-col w-full h-1/2">
            <NoContent text="คุณไม่มี Party ที่เข้าร่วมในตอนนี้" white />
          </div>
          :
          _.map(partyContext.allMyParty, (data, index) => (
            <>
              {
                index < 2 ? 
                <CardMyParty party={data} key={index} />
                  : <></>
              }
            </>
          ))
      }
      <div className="px-8 space-y-5">
        <div className="flex">
          <ButtonWithColor variant="contained" className="w-full text-white" onClick={() => handleRandom()}> เข้าร่วมปาร์ตี้แบบสุ่ม </ButtonWithColor>
          {
            process.env.NODE_ENV == "development" ?
            <div className="flex">
            <Button variant="contained" color="secondary" onClick={() => userContext.signout()}> sign out</Button>
            </div>
            : <></>
          }
        </div>
        <div className="flex justify-between space-x-5">
          <ButtonWithColor variant="contained" className="w-1/3 text-white" onClick={() => router.push('/restaurant')}> เลือกร้านอาหาร </ButtonWithColor>
          <ButtonWithColor variant="contained" className="w-1/3 text-white" onClick={() => router.push('/party/history')}> ประวัติ </ButtonWithColor>
          <ButtonWithColor variant="contained" className="w-1/3 text-white" onClick={() => router.push('/party/request')}> รายการคำขอ </ButtonWithColor>
        </div>
      </div>
      {
        openModal ?
          <PartyModal
            showModal={openModal}
            callBackToPartyList={valueFromPartyModal}
            party={party}
            mode="quick"
          />
        : <></>
      }
      {
        openDecline ?
          <DeclineModal
            showModal={openDecline}
            callBackToPartyList={valueFromPartyModal}
            text={declineText}
          />
        : <></>
      }
      
    </Background>
  )
}

export default Home