import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { BottomNavigationAction, IconButton } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import Navigator from '../../core/components/Navigator'
import PartyList from '../../features/Party/pages/party-list'

const Party = () => {
  const router = useRouter()

  const goToCreateParty = (e) => {
    e.preventDefault()
    router.push("/party/create")
  }

  return (
    <Navigator
      backTextButton='Restaurant'
      backRoute='/'
      middleText='Party'
      leftIcon={
        <IconButton>
          <SortIcon />
        </IconButton>
      }
      bottomNavigator={
        <>
          <div className="flex w-1/3 justify-center">
            <BottomNavigationAction label="ขอเข้าร่วม" icon={<ListIcon />} showLabel />
          </div>
          <div className="flex w-1/3 justify-center">
            <BottomNavigationAction label="สร้างปาร์ตี้ใหม่" icon={<AddIcon />} showLabel onClick={goToCreateParty} />
          </div>
          <div className="flex w-1/3 justify-center">
            <BottomNavigationAction label="ข้อความ" icon={<QuestionAnswerIcon />} showLabel />
          </div>
        </>
      }
    >
      <PartyList />
    </Navigator>
  )
}

export default Party
