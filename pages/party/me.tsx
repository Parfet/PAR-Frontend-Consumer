import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import Fab from '@material-ui/core/Fab'
import ListIcon from '@material-ui/icons/List';

import Navigator from '../../core/components/Navigator'
import MyParty from '../../features/Party/pages/my-party'

const OverflowFab = styled(Fab)`
  position: relative;
  right:0;
  background-color: white;
`

const CreatePartyPage = () => {
  const router = useRouter()

  return (
    <Navigator
      backTextButton='Home'
      backRoute='/'
      middleText='My Party'
      leftIcon={
        <IconButton>
          <SortIcon />
        </IconButton>
      }
      floatingButton={
        <OverflowFab >
          <ListIcon />
        </OverflowFab>
      }
    >
      <MyParty />
    </Navigator>
  )
}

export default CreatePartyPage