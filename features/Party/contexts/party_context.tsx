import { makeAutoObservable  } from 'mobx'
import { createContext } from 'react'
import { StatusCodes } from 'http-status-codes';

import { Party } from '../../../core/constant/type'
import apiParty from '../services/apiParty'

export class PartyContext {
  parties: Party[]
  currentParty: Party

  constructor() {
    this.parties
    this.currentParty

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

  getPartyByPartyId = async (partyId :string) => {
    try {
      const response = await apiParty.getPartyByPartyId(partyId)
      if (response.status === StatusCodes.OK){
        this.currentParty = response.data.party
      }else{
        this.parties = []
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const partyContext = createContext(new PartyContext())