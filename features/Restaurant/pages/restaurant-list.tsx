import React, { useContext, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import styled from 'styled-components'
import { useObserver } from 'mobx-react-lite'
import _ from "lodash"

import { mockParty } from '../../../core/config/mockData'
import { restaurantContext } from '../contexts/restaurant_context'
import CardRestaurant from '../components/CardRestaurant'

const BackgroundPartyList = styled.div`
  background-color: #F8CE28;
  height: 100vh;
`

const RestaurantList = () => {
  const contextParty = useContext(restaurantContext)

  useEffect(() => {
    contextParty.getRestaurants()
  }, [contextParty])

  return useObserver(() => (
    <BackgroundPartyList className="overscroll-auto pt-4 pb-10">
      {
        _.map(contextParty.restaurant, (data, index) => (
          <CardRestaurant restaurant={data} key={index} />
        ))
      }
    </BackgroundPartyList>
  ))
}

export default RestaurantList
