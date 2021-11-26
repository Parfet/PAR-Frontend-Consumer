import React, { useState, useEffect, useContext, createContext } from 'react';
import { StatusCodes } from 'http-status-codes';

import { Restaurant } from '../../../core/constant/type'
import apiRestaurant from '../services/apiRestaurant'

interface RestaurantContextInterface {
  restaurants: Restaurant[]
  currentRestaurant: Restaurant
  setCurrentRestaurant: Function
  getRestaurants: Function
}

type SearchWord = {
  keyword: string
  lat: 0
  lng: 0
}

const restaurantContext = createContext<RestaurantContextInterface | null>(null);

export const RestaurantProvider = ({ children }) => {
  const restaurant = RestaurantFunction();
  return <restaurantContext.Provider value={restaurant}>{children}</restaurantContext.Provider>;
}
export const useRestaurant = () => {
  return useContext(restaurantContext);
};

const RestaurantFunction = () => {
  const [searchWord, setSearchWord] = useState<SearchWord>({ keyword: "", lat: 0, lng: 0 });
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>();
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant>();

  const getRestaurants = async (filter: SearchWord) => {
    let param = ""

    Object.keys(searchWord).forEach((key, index) => {
      for (const [k, v] of Object.entries(filter)) {
        if (key === k) {
          searchWord[key] = v
        }
      }
      if (index === Object.keys(searchWord).length - 1) {
        param = param + key + "=" + searchWord[key]
      } else {
        param = param + key + "=" + searchWord[key] + "&"
      }
    });

    try {
      const response = await apiRestaurant.getAllRestaurants(param)
      if (response.status === StatusCodes.OK) {
        setRestaurants(response.data.restaurants)
        console.log("🚀 ~ file: restaurant_context.tsx ~ line 57 ~ getRestaurants ~ response.status", response.status)
        return true
      } else {
        setRestaurants([])
        return true
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    restaurants,
    currentRestaurant,
    setCurrentRestaurant,
    getRestaurants,
  };
}
