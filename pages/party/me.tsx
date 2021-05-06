import React from 'react'
import { useRouter } from 'next/router'
import { IconButton } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';

import Navigator from '../../core/components/Navigator'
import MyParty from '../../features/Party/pages/my-party'

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
    >
      <MyParty />
    </Navigator>
  )
}

export default CreatePartyPage