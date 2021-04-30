import { makeAutoObservable  } from 'mobx'
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
      if (response.status === StatusCodes.OK){
        this.parties = response.data.parties
      }else{
        this.parties = []
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const partyContext = createContext(new PartyContext())