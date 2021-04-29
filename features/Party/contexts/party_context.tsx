import { makeAutoObservable, observable, action } from 'mobx'
import { createContext } from 'react'
import { StatusCodes } from 'http-status-codes';

import apiParty from '../services/apiParty'

export class PartyContext {
  parties

  constructor() {
    this.parties = []

    makeAutoObservable(this)
  }

  
  getParties = async (restaurantId :string) => {
    try {
      const response = await apiParty.getPartyByRestaurantId(restaurantId)
      if (response.status === StatusCodes.NO_CONTENT){
        this.parties = []
      }
      this.parties = response.data.parties
    } catch (error) {
      console.log(error)
    }
  }
}

export const partyContext = createContext(new PartyContext())