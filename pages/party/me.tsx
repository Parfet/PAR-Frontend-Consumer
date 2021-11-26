import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import Fab from '@material-ui/core/Fab'
import ListIcon from '@material-ui/icons/List';
import Cookies from 'universal-cookie'

import Navigator from '../../core/components/Navigator'
import MyParty from '../../features/Party/pages/my-party'
import { useUser } from '../../core/context/auth_context';

const OverflowFab = styled(Fab)`
  position: relative;
  right:0;
  background-color: white;
`
const cookies = new Cookies()

const CreatePartyPage = () => {
  const router = useRouter()
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

  return (
    <Navigator
      backTextButton='หน้าหลัก'
      backRoute={() => router.push('/')}
      middleText='ปาร์ตี้ของฉัน'
      floatingButton={
        <OverflowFab onClick={() => router.push("/party/request")} >
          <ListIcon />
        </OverflowFab>
      }
    >
      <MyParty />
    </Navigator>
  )
}

export default CreatePartyPage