import { makeAutoObservable, runInAction } from 'mobx'
import { createContext } from 'react'
import { StatusCodes } from 'http-status-codes';

import apiUser from '../services/apiUser'
import { User } from '../constant/type'

export class AuthContext {
  users: User[]
  user: User
  userId

  constructor() {
    this.users
    this.user 
    this.userId = ''
    makeAutoObservable(this)
  }


  getOneUser = async () => {
    try {
      const response = await apiUser.getUser()
      if (response.status === StatusCodes.OK) {
          this.user = response.data.users[3]
          this.userId = response.data.users[3].user_id
      } else {
        this.user
      }
    } catch (error) {
      console.log(error)
    }
  }

  getAllUser = async () => {
    try {
      const response = await apiUser.getUser()
      if (response.status === StatusCodes.OK) {
        this.users = response.data.users
      } else {
        this.users = null
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const authContext = createContext(new AuthContext())