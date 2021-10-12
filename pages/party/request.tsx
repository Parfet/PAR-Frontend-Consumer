import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import Fab from '@material-ui/core/Fab'
import ListIcon from '@material-ui/icons/List';
import Cookies from 'universal-cookie'

import Navigator from '../../core/components/Navigator'
import MyRequest from '../../features/Party/pages/my-request'
import { useUser } from '../../core/context/auth_context';

const OverflowFab = styled(Fab)`
  position: relative;
  right:0;
  background-color: white;
`
const cookies = new Cookies()

const RequestPartyPage = () => {
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
      backTextButton='Back'
      backRoute={() => router.back()}
      middleText='คำขอเข้าร่วม'
    >
      <MyRequest />
    </Navigator>
  )
}

export default RequestPartyPage