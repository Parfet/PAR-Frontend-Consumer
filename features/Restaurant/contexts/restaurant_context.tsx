import { makeAutoObservable, observable, action } from 'mobx'
import { createContext } from 'react'
import { StatusCodes } from 'http-status-codes';

import apiRestaurant from '../services/apiRestaurant'
import { RestaurantStatus } from '../../../core/constant/enum'
import { Restaurant } from '../../../core/constant/type'

export class RestaurantContext {
  restaurant: Restaurant[]
  currentRestaurant: Restaurant
  searchObject: Object

  constructor() {
    this.restaurant = []
    this.currentRestaurant = { restaurant_id:'' }
    this.searchObject = { name: "", status: RestaurantStatus.RESTAURANT_OPEN }
    // this.searchObject = { name: "", promotions: true, status: RestaurantStatus.RESTAURANT_OPEN }
    makeAutoObservable(this)
  }


  getRestaurants = async (prefix?: string, value?: string) => {
    let param = ""
    Object.keys(this.searchObject).forEach((key, index) => {
      if (key === prefix){
        this.searchObject[key] = value
      }
      if (index === Object.keys(this.searchObject).length-1) {
        param = param + key + "=" + this.searchObject[key]
      }else {
        param = param + key + "=" + this.searchObject[key] + "&"
      }
    });
    
    try {
      const response = await apiRestaurant.getAllRestaurants(param)
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