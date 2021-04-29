import { makeAutoObservable, observable, action } from 'mobx'
import { createContext } from 'react'

import apiRestaurant from '../services/apiRestaurant'
import { Restaurant } from '../../../core/constant/type'

export class RestaurantContext {
  restaurant
  currentRestaurant

  constructor() {
    this.restaurant = []
    this.currentRestaurant = {}

    makeAutoObservable(this)
  }


  getRestaurants = async () => {
    try {
      const response = await apiRestaurant.getAllRestaurants()
      this.restaurant = response.data.restaurants
    } catch (error) {
      console.log(error)
    }
  }

  setCurrentRestaurant = (currentRestaurant :Restaurant) => {
    this.currentRestaurant = currentRestaurant
  }
}

export const restaurantContext = createContext(new RestaurantContext())