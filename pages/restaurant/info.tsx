import React from 'react'
import { useRouter } from 'next/router'
import { IconButton } from '@material-ui/core';
import RestaurantIcon from '@material-ui/icons/Restaurant';

import Navigator from '../../core/components/Navigator'
import RestaurantInfo from '../../features/Restaurant/pages/restaurant-info'

const RestaurantInfoPage = () => {
  const router = useRouter()

  return (
    <Navigator
      yellow
      backTextButton='Back'
      backRoute='/restaurant'
      middleText='Information'
      leftIcon={
        <IconButton onClick={() => router.push('/party')}>
          <RestaurantIcon fontSize="large" style={{color:'white'}}/>
        </IconButton>
      }
    >
      <></>
      {/* <RestaurantInfo /> */}
    </Navigator>
  )
}

export default RestaurantInfoPage