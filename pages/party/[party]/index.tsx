import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { BottomNavigationAction, IconButton } from '@material-ui/core';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

import { PartyAction } from '../../../core/constant/enum'
import Navigator from '../../../core/components/Navigator'
import Meatball from '../../../core/components/Meatball'
import ConfirmModal from '../../../core/components/ConfirmModal'
import Party from '../../../features/Party/pages/party'

const menuColors = ["bg-cusRegularYellow", "bg-cusDarkYellow"]

const PartyPage = () => {
  const router = useRouter()
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [typeAction, setTypeAction] = useState("")

  const partyName = router.query

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
    { text: 'แก้ไชปาร์ตี้', menuFunc: () => { } },
    { text: 'ออกจากปาร์คี้', menuFunc: leaveParty },
    { text: 'ปิดปาร์ตี้', menuFunc: closeParty }
  ]

  const closePartyAPI = () => {
    console.log(PartyAction.CLOSE_PARTY)
    //Do sth
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
        backRoute='/party'
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
                onClick={() => router.push(`/party/${partyName.party}/request`)}
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
