import { makeAutoObservable, runInAction } from 'mobx'
import { createContext } from 'react'
import { StatusCodes } from 'http-status-codes';

import { Party, Tag } from '../../../core/constant/type'
import apiParty from '../services/apiParty'

export class PartyContext {
  parties: Party[]
  allMyParty: Party[]
  currentParty: Party
  allTag: Tag[]

  constructor() {
    this.parties = []
    this.allMyParty = []
    this.currentParty = { party_id: "" }
    this.allTag = [{ value: "", label: "" }]

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

  getPartyByPartyId = async (partyId) => {
    try {
      const response = await apiParty.getPartyByPartyId(partyId)
      if (response.status === StatusCodes.OK){
          this.currentParty = response.data.party
      }else{
        this.currentParty = { party_id: "" }
      }
    } catch (error) {
      console.log(error)
    }
  }

  getAllTag = async () => {
    try {
      const response = await apiParty.getAllTag()
      if (response.status === StatusCodes.OK){
        this.allTag = response.data.tags
      }else{
        this.allTag = [{ value: "", label: "" }]
      }
    } catch (error) {
      console.log(error)
    }
  }

  getPartyByUserId = async () => {
    try {
      const response = await apiParty.getPartyByUserId()
      if (response.status === StatusCodes.OK) {
        this.allMyParty = response.data.parties
      } else {
        this.allMyParty = []
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const partyContext = createContext(new PartyContext())