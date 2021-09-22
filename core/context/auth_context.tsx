import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import { StatusCodes } from 'http-status-codes';

import apiAuth from '../services/apiAuth'
import { User } from '../constant/type'
export class AuthContext {
  userData: User
  latitude: number
  longitude: number

  constructor() {
    this.userData = null
    this.latitude = 0
    this.longitude = 0
    makeAutoObservable(this)
  }

  getUserData = async () => {
    try {
      const response = await apiAuth.getUserData()
      if (response.status === StatusCodes.OK) {
        this.userData = response.data.user
      } else {
        this.userData = null
      }
    } catch (error) {
      console.log(error)
    }
  }

  setLatAndLong(lat: number, long: number){
    this.latitude = lat
    this.longitude = long
  }
}

export const authContext = createContext(new AuthContext())