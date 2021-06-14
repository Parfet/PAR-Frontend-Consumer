import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { StatusCodes } from 'http-status-codes';
import { BottomNavigationAction, IconButton } from '@material-ui/core';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

import { Errors, PartyAction } from '../../../core/constant/enum'
import Navigator from '../../../core/components/Navigator'
import Meatball from '../../../core/components/Meatball'
import ConfirmModal from '../../../core/components/ConfirmModal'
import Party from '../../../features/Party/pages/party'
import { partyContext } from '../../../features/Party/contexts/party_context'
import apiParty from '../../../features/Party/services/apiParty';

const menuColors = ["bg-cusRegularYellow", "bg-cusDarkYellow"]

const PartyPage = () => {
  const router = useRouter()
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [typeAction, setTypeAction] = useState("")
  const contextParty = useContext(partyContext)

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

  const menuItems = [
    { text: 'แก้ไขปาร์ตี้', menuFunc: () => router.push('/party/' + contextParty.currentParty.party_id + '/edit') },
    { text: 'ออกจากปาร์คี้', menuFunc: leaveParty },
    { text: 'ปิดปาร์ตี้', menuFunc: closeParty }
  ]

  const closePartyAPI = async () => {
    try {
      const res = await apiParty.archivedParty(contextParty.currentParty.party_id)
      if (res.status === StatusCodes.OK) {
        router.push('/restaurant')
      }
    } catch (error) {
      if (error.response?.status === StatusCodes.FORBIDDEN) {
        const message = error.response?.data.message
        if (message === Errors.PERMISSION_DENIED) {
          router.push('/party/' + contextParty.currentParty.party_id)
        } else {
          router.push('/')
        }
      }
    }
  }

  const leavePartyAPI = () => {
    console.log(PartyAction.LEAVE_PARTY)
    //Do sth
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

  return (  
      <Navigator
        yellow
        backTextButton='Back'
        backRoute='/party/me'
        middleText="Party"
        leftIcon={
          <Meatball 
            menuItems={menuItems}
            menuColors={menuColors}
          />
        }
        bottomNavigator={
          <>
            <div className="flex w-1/2 justify-center">
              <BottomNavigationAction 
                label="คำร้อง" 
                icon={<PeopleAltOutlinedIcon />} 
                onClick={() => router.push(`/party/${contextParty.currentParty.party_id}/request`)}
                showLabel 
              />
            </div>
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
  )
}

export default PartyPage
