import React, { useState, useEffect, useContext, createContext } from 'react';
import { StatusCodes } from 'http-status-codes';

import { Party, Tag } from '../../../core/constant/type'
import apiParty from '../services/apiParty'

interface PartyContextInterface {
  parties: Party[]
  allMyParty: Party[]
  currentParty: Party
  allTag: Tag[]
  getParties: Function
  getPartyByPartyId: Function
  getAllTag: Function
  getPartyByUserId: Function
  getMyPartyRequest: Function
  getHistory: Function
  checkJoinStatus: Function
  randomParty: Function
  cancelJoinParty: Function
}

const partyContext = createContext<PartyContextInterface | null>(null);

export const PartyProvider = ({ children }) => {
  const party = PartyFunction();
  return <partyContext.Provider value={party}>{children}</partyContext.Provider>;
}
export const useParty = () => {
  return useContext(partyContext);
};

const PartyFunction = () => {
  const [parties, setParties] = useState<Array<Party>>();
  const [allMyParty, setAllMyParty] = useState<Array<Party>>();
  const [currentParty, setCurrentParty] = useState<Party>();
  const [allTag, setAllTag] = useState<Array<Tag>>();

  const getParties = async (restaurantId :string) => {
    try {
      const response = await apiParty.getPartyByRestaurantId(restaurantId)
      if (response.status === StatusCodes.OK){
        setParties(response.data.parties)
      }else{
        setParties([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getPartyByPartyId = async (partyId) => {
    try {
      const response = await apiParty.getPartyByPartyId(partyId)
      if (response.status === StatusCodes.OK){
          setCurrentParty(response.data.party)
      }else{
        setCurrentParty({ party_id: "" })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllTag = async () => {
    try {
      const response = await apiParty.getAllTag()
      if (response.status === StatusCodes.OK){
        setAllTag(response.data.tags)
      }else{
        setAllTag([{ value: "", label: "" }])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getPartyByUserId = async () => {
    try {
      const response = await apiParty.getPartyByUserId()
      if (response.status === StatusCodes.OK) {
        setAllMyParty(response.data.parties)
      } else {
        setAllMyParty([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getMyPartyRequest = async () => {
    try {
      const response = await apiParty.getMyPartyRequest()
      if(response.status == StatusCodes.NO_CONTENT){
        return []
      }
      return response.data.request_list
    } catch (error) {
      console.log(error)
    }
  }

  const getHistory = async () => {
    try {
      const response = await apiParty.getHistory()
      if(response.status == StatusCodes.NO_CONTENT){
        return []
      }
      return response.data.history
    } catch (error) {
      console.log(error)
    }
  }

  const checkJoinStatus = async (partyId: String) => {
    try {
      const response = await apiParty.checkJoinStatus(partyId)
      if(response.status == StatusCodes.NO_CONTENT){
        return ""
      }
      return response.data.status
    } catch (error) {
      console.log(error)
    }
  }

  const randomParty = async (data) => {
    try {
      const response = await apiParty.randomParty(data)
      if (response.status == StatusCodes.NO_CONTENT) {
        return null
      }
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const cancelJoinParty = async (partyId) => {
    try {
      const response = await apiParty.cancelJoinParty(partyId)
      return !!response
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return {
    parties,
    allMyParty,
    currentParty,
    allTag,
    getParties,
    getPartyByPartyId,
    getAllTag,
    getPartyByUserId,
    getMyPartyRequest,
    getHistory,
    checkJoinStatus,
    randomParty,
    cancelJoinParty
  };
}
