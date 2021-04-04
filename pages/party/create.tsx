import React from 'react'
import { useRouter } from 'next/router'
import SortIcon from '@material-ui/icons/Sort';

import Navigator from '../../core/components/Navigator'
import CreateParty from '../../features/Party/pages/create-party'

const CreatePartyPage = () => {
  const router = useRouter()

  return (
    <Navigator
      isYellow
      backTextButton='Back'
      backRoute='/party'
      middleText='New Party'
    >
      <CreateParty />
    </Navigator>
  )
}

export default CreatePartyPage