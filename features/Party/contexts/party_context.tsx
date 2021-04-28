import { makeAutoObservable, observable, action } from 'mobx'
import { createContext } from 'react'
import apiParty from '../services/apiParty'

export class PartyContext {
  parties

  constructor() {
    this.parties = []

    makeAutoObservable(this)
  }

  
  getParties = async () => {
    try {
      const response = await apiParty.getPartyByRestaurantId()
      this.parties = response.data.parties
    } catch (error) {
      console.log(error)
    }
  }
}

export const partyContext = createContext(new PartyContext())