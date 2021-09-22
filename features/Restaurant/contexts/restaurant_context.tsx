import { makeAutoObservable, observable, action } from 'mobx'
import { createContext } from 'react'
import { StatusCodes } from 'http-status-codes';

import apiRestaurant from '../services/apiRestaurant'
import { RestaurantStatus } from '../../../core/constant/enum'
import { Restaurant } from '../../../core/constant/type'
export class RestaurantContext {
  restaurant: []
  currentRestaurant: Restaurant
  searchObject: Object

  constructor() {
    this.restaurant = []
    this.currentRestaurant = { restaurant_id:'' }
    this.searchObject = { keyword: "", lat: 0, lng: 0 }
    makeAutoObservable(this)
  }


  getRestaurants = async (filter: Object) => {
    let param = ""
    Object.keys(this.searchObject).forEach((key, index) => {
      for (const [k, v] of Object.entries(filter)) {
        if (key === k){
          this.searchObject[key] = v
        }
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
        console.log("🚀 ~ file: restaurant_context.tsx ~ line 40 ~ RestaurantContext ~ getRestaurants= ~ response.data.restaurants", response.data.restaurants)
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