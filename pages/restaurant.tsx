import React from 'react'
import { useRouter } from 'next/router'
import { BottomNavigationAction, IconButton } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FolderIcon from '@material-ui/icons/Folder';

import Navigator from '../core/components/Navigator'
import RestaurantList from '../features/Restaurant/pages/restaurant-list'

const Restaurant = () => {
  const router = useRouter()

  const goToCreateParty = (e) => {
    e.preventDefault()
    router.push("/party/create")
  }

  return (
    <Navigator
      middleText='Restaurant'
      rightIcon={
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      }
      leftIcon={
        <IconButton>
          <SortIcon />
        </IconButton>
      }
      bottomNavigator={
        <>
          <div className="flex w-1/2 justify-center">
            <BottomNavigationAction label="ขอเข้าร่วม" icon={<ListIcon />} showLabel />
          </div>
          <div className="flex w-1/2 justify-center">
            <BottomNavigationAction 
              label="ปาร์ตี้ของฉัน" 
              icon={<FolderIcon />}
              showLabel 
              onClick={() => router.push("/party/me")}
              />
          </div>
        </>
      }
    >
      <RestaurantList />
    </Navigator>
  )
}

export default Restaurant