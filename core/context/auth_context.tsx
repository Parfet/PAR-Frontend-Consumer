import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import { StatusCodes } from 'http-status-codes';
import Cookies from 'universal-cookie'
import { Router } from 'next/router'

import apiAuth from '../services/apiAuth'
import { User } from '../constant/type'

const cookies = new Cookies()
export class AuthContext {
  users: User[]
  user: User
  userId: string 

  constructor() {
    this.users = [{ user_id: ""}]
    this.user  = { user_id: ""} 
    this.userId = ''
    makeAutoObservable(this)
  }


  login = async (username) => {
    let currentUser: User
    this.users.find((data) => {
      if (data.username === username) {
        currentUser = data
      }
    })
    try {
      if (currentUser != null){
        const response = await apiAuth.getJWTToken({ user_id: currentUser.user_id})
        if (response.status === StatusCodes.OK) {
          this.user = currentUser
          this.userId = currentUser.user_id
          cookies.set('access_token', response.data.access_token, { path: '/', maxAge: 3600 })
          cookies.set('refresh_token', response.data.refresh_token, { path: '/', maxAge: 3600 })
          Router.prototype.replace('/restaurant')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  getAllUser = async () => {
    try {
      const response = await apiAuth.getUser()
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