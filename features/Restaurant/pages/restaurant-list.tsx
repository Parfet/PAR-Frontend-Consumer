import React, { useContext, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import styled from 'styled-components'
import { useObserver } from 'mobx-react-lite'
import _ from "lodash"

import { authContext } from '../../../core/context/auth_context'
import { restaurantContext } from '../contexts/restaurant_context'
import CardRestaurant from '../components/CardRestaurant'

const BackgroundRestaurantList = styled.div`
  background-color: #F8CE28;
  height: ${ props => props.height > 3 ? "auto" : '100vh'};
`

const RestaurantList = () => {
  const contextAuth = useContext(authContext)
  const contextRestaurant = useContext(restaurantContext)

  useEffect(() => {
    contextRestaurant.getRestaurants()
    contextAuth.getUser()
    return () => {
      contextRestaurant.restaurant = []
      contextAuth.user={ user_id: ""}
    }
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
