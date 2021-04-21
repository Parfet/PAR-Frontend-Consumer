import React from 'react'
import { useRouter } from 'next/router'
import { BottomNavigationAction, IconButton } from '@material-ui/core';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

import Navigator from '../../../core/components/Navigator'
import Meatball from '../../../core/components/Meatball'
import Party from '../../../features/Party/pages/party'

const menuColors = ["bg-cusRegularYellow", "bg-cusDarkYellow"]

const PartyPage = () => {
  const router = useRouter()

  const partyName = router.query

  const menuItems = [
    { text: 'แก้ไชปาร์ตี้', menuFunc: () => { } },
    { text: 'ออกจากปาร์คี้', menuFunc: () => { router.push("/party") } },
    { text: 'ปิดปาร์ตี้', menuFunc: () => { router.push("/party") } }
  ]

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
        <Party />
      </Navigator>
  )
}

export default PartyPage
