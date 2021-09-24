import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BottomNavigationAction, IconButton } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import FolderIcon from '@material-ui/icons/Folder';

import Navigator from '../../core/components/Navigator'
import FilterParty from '../../features/Party/components/FilterParty'
import PartyList from '../../features/Party/pages/party-list'
import { useParty } from '../../features/Party/contexts/party_context'

const Party = () => {
  const router = useRouter()
  const partyContext = useParty()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    partyContext.getAllTag()
  }, [])

  const callBackFormFilter = (value) => {
    setOpen(value)
  }

  const handleOpenFilter = () => {
    if (open) {
      setOpen(!open)
    } else {
      setOpen(!open)
    }
  }
  
  return (
    <Navigator
      backTextButton='Restaurant'
      backRoute='/restaurant'
      middleText='Party'
      leftIcon={
        <IconButton onClick={handleOpenFilter} >
          <SortIcon />
        </IconButton>
      }
      bottomNavigator={
        <>
          <div className="flex w-1/3 justify-center">
            <BottomNavigationAction label="ขอเข้าร่วม" icon={<ListIcon />} showLabel />
          </div>
          <div className="flex w-1/3 justify-center">
            <BottomNavigationAction label="สร้างปาร์ตี้ใหม่" icon={<AddIcon />} showLabel onClick={() => router.push("/party/create")} />
          </div>
          <div className="flex w-1/3 justify-center">
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
        <FilterParty open={open} callBackFormFilter={callBackFormFilter} />
        <PartyList />
      </>
    </Navigator>
  )
}

export default Party
