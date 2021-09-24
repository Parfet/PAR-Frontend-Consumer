import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { StatusCodes } from 'http-status-codes';
import { BottomNavigationAction, IconButton } from '@material-ui/core';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import InfoIcon from '@material-ui/icons/Info';
import Cookies from 'universal-cookie'

import { Errors, PartyAction } from '../../../core/constant/enum'
import Navigator from '../../../core/components/Navigator'
import Meatball from '../../../core/components/Meatball'
import ConfirmModal from '../../../core/components/ConfirmModal'
import Loading from '../../../core/components/Loading'
import Party from '../../../features/Party/pages/party'
import apiParty from '../../../features/Party/services/apiParty';
import { useUser } from '../../../core/context/auth_context';
import { useParty } from '../../../features/Party/contexts/party_context';

const menuColors = ["bg-cusRegularYellow", "bg-cusDarkYellow"]

const cookies = new Cookies()

const PartyPage = () => {
  const router = useRouter()
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [typeAction, setTypeAction] = useState("")
  const [partyInfo, setPartyInfo] = useState(null)
  const userContext = useUser();
  const partyContext = useParty();

  useEffect(() => {
    (async () => {
      console.log("🚀 ~ file: index.tsx ~ line 46 ~ !userContext.userData", !userContext.userData)
      if (!userContext.userData) {
        if (cookies.get("access_token")) {
          await userContext.getUserData()
          console.log("🚀 ~ file: index.tsx ~ line 47 ~ userContext.userData", userContext.userData)
        } else {
          router.push('/signin')
        }
      }
      if (router.asPath !== router.route) {
        await partyContext.getPartyByPartyId(router.query.party)
        await setPartyInfo(partyContext.currentParty)
        
        // buttomNavigationData()
      }
      })()
  }, [router])
  
  const closeParty = () => {
    setConfirmText("ต้องการปิดปาร์ตี้")
    setOpenConfirmModal(true)
    setTypeAction(PartyAction.CLOSE_PARTY)
  }

  const leaveParty = () => {
    setConfirmText("ต้องการออกจากปาร์ตี้")
    setOpenConfirmModal(true)
    setTypeAction(PartyAction.LEAVE_PARTY)
  }

  const closePartyAPI = async () => {
    try {
      const res = await apiParty.archivedParty(partyContext.currentParty.party_id)
      if (res.status === StatusCodes.OK) {
        router.push('/party/me')
      }
    } catch (error) {
      if (error.response?.status === StatusCodes.FORBIDDEN) {
        const message = error.response?.data.message
        if (message === Errors.PERMISSION_DENIED) {
          router.push('/party/' + partyContext.currentParty.party_id)
        } else {
          router.push('/')
        }
      }
    }
  }

  const leavePartyAPI = async () => {
    try {
      const res = await apiParty.leaveParty(partyContext.currentParty.party_id)
      if (res.status === StatusCodes.OK) {
        router.push('/restaurant')
      }
    } catch (error) {
      if (error.response?.status === StatusCodes.BAD_REQUEST) {
        router.push('/party/' + partyContext.currentParty.party_id)
      }else if (error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
        router.push('/')
      }
    }
  }

  const callBackFromConfirm = (open, value) => {
    setOpenConfirmModal(open)
    if (value) {
      if (typeAction === PartyAction.CLOSE_PARTY) {
        closePartyAPI()
      } else if (typeAction === PartyAction.LEAVE_PARTY) {
        leavePartyAPI()
      }
    }
  }

  const menuItems = [
    { text: 'ออกจากปาร์ตี้', menuFunc: leaveParty },
  ]

  const menuAdmin = [
    { text: 'แก้ไขปาร์ตี้', menuFunc: () => router.push('/party/' + partyContext.currentParty.party_id + '/edit') },
    { text: 'ปิดปาร์ตี้', menuFunc: closeParty }
  ]

  return (
    <>
    {
      userContext.userData && partyContext.currentParty ?
        <Navigator
          yellow
          backTextButton='Back'
          backRoute='/party/me'
          middleText="Party"
          leftIcon={
            <Meatball
              menuItems={
                userContext.userData.username === partyContext.currentParty.head_party.username
                  ? menuAdmin : menuItems
              }
              menuColors={menuColors}
            />
          }
          bottomNavigator={
            <>
              {
                userContext.userData.username === partyContext.currentParty.head_party.username ?
                  <div className="flex w-1/2 justify-center">
                    <BottomNavigationAction
                      label="คำร้อง"
                      icon={<PeopleAltOutlinedIcon />}
                      onClick={() => router.push(`/party/${partyContext.currentParty.party_id}/request`)}
                      showLabel
                    />
                  </div>
                  :
                  <div className="flex w-1/2 justify-center">
                    <BottomNavigationAction
                      label="รายละเอียด"
                      icon={<InfoIcon />}
                      showLabel
                    />
                  </div>
              }
              <div className="flex w-1/2 justify-center">
                <BottomNavigationAction label="ข้อความ" icon={<ChatOutlinedIcon />} showLabel />
              </div>
            </>
          }
        >
          <>
            <Party />
            {
              openConfirmModal ?
                <ConfirmModal
                  confirmText={confirmText}
                  showModal={openConfirmModal}
                  callBackToParent={callBackFromConfirm}
                />
                : <></>
            }
          </>
        </Navigator>
        :
          <Loading/>
    }
    </>
  )
}


export default PartyPage