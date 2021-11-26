import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BottomNavigationAction, IconButton } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ListIcon from '@material-ui/icons/List';
import FolderIcon from '@material-ui/icons/Folder';
import Cookies from 'universal-cookie'

import Navigator from '../../core/components/Navigator'
import RestaurantList from '../../features/Restaurant/pages/restaurant-list'
import FilterRestaurant from '../../features/Restaurant/components/FilterRestaurant'
import { useUser } from '../../core/context/auth_context';

const cookies = new Cookies()

const Restaurant = () => {
  const router = useRouter()
  const [open,  setOpen] = useState(false)
  const userContext = useUser();

  useEffect(() => {
    (async () => {
      if (userContext.userData === null) {
        if (cookies.get("access_token")) {
          await userContext.getUserData()
        } else {
          router.push('/signin')
        }
      }
    })()
  }, [])

  const goToCreateParty = (e) => {
    e.preventDefault()
    router.push("/party/create")
  }

  const callBackFormFilter = (value) => {
    setOpen(value)
  }

  const handleOpenFilter = ()=> {
    if(open){
      setOpen(!open)
    }else{
      setOpen(!open)
    }
  }

  return (
    <Navigator
      middleText='ร้านอาหาร'
      backTextButton='กลับ'
      backRoute={() => router.push('/')}
      bottomNavigator={
        <>
          <div className="flex w-1/2 justify-center">
            <BottomNavigationAction 
              label="คำขอของฉัน"
              icon={<ListIcon />} 
              showLabel 
              onClick={() => router.push("/party/request")}
              />
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
      <>
        <FilterRestaurant open={open} callBackFormFilter={callBackFormFilter} />
        <RestaurantList />
      </>
    </Navigator>
  )
}

export default Restaurant