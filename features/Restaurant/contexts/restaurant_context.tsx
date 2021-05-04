import { makeAutoObservable, observable, action } from 'mobx'
import { createContext } from 'react'
import { StatusCodes } from 'http-status-codes';

import apiRestaurant from '../services/apiRestaurant'
import { Restaurant } from '../../../core/constant/type'

export class RestaurantContext {
  restaurant: Restaurant[]
  currentRestaurant: Restaurant

  constructor() {
    this.restaurant = []
    this.currentRestaurant = { restaurant_id:'' }

    makeAutoObservable(this)
  }


  getRestaurants = async () => {
    try {
      const response = await apiRestaurant.getAllRestaurants()
      if (response.status === StatusCodes.OK) {
        this.restaurant = response.data.restaurants
      }else {
        this.restaurant = []
      }
    } catch (error) {
      console.log(error)
    }
  }

  setCurrentRestaurant = (currentRestaurant :Restaurant) => {
    this.currentRestaurant = currentRestaurant
  }
}

export const restaurantContext = createContext(new RestaurantContext())