import React, { useContext, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import styled from 'styled-components'
import { useObserver } from 'mobx-react-lite'
import _ from "lodash"

import { mockParty } from '../../../core/config/mockData'
import { restaurantContext } from '../contexts/restaurant_context'
import CardRestaurant from '../components/CardRestaurant'

const BackgroundRestaurantList = styled.div`
  background-color: #F8CE28;
  height: ${ props => props.height > 3 ? "auto" : '100vh'};
`

const RestaurantList = () => {
  const contextRestaurant = useContext(restaurantContext)

  useEffect(() => {
    contextRestaurant.getRestaurants()
  }, [contextRestaurant])

  return useObserver(() => (
    <BackgroundRestaurantList className="overscroll-auto pt-4 pb-10" height={_.size(contextRestaurant.restaurant)}>
      {
        _.map(contextRestaurant.restaurant, (data, index) => (
          <CardRestaurant restaurant={data} key={index} />
        ))
      }
    </BackgroundRestaurantList>
  ))
}

export default RestaurantList
