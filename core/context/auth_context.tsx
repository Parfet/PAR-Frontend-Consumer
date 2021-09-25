import React, { useState, useEffect, useContext, createContext } from 'react';
import { StatusCodes } from 'http-status-codes';

import { User } from '../constant/type'
import apiAuth from '../services/apiAuth'

interface UserContextInterface {
  userData: User
  latitude: string
  longitude: string
  setLatitude: Function
  setLongitude: Function
  getUserData: Function
}

const userContext = createContext<UserContextInterface | null>(null);

export const UserProvider = ({ children }) => {
  const user = UserFunction();
  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}
export const useUser = () => {
  return useContext(userContext);
};

const UserFunction = () => {
  const [userData, setUserData] = useState<User>(null);
  const [latitude, setLatitude] = useState<string>();
  const [longitude, setLongitude] = useState<string>();

  const getUserData = async () => {
    try {
      const response = await apiAuth.getUserData()
      if (response.status === StatusCodes.OK) {
        setUserData(response.data.user)
      } else {
        setUserData(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    userData,
    latitude,
    longitude,
    setLatitude,
    setLongitude,
    getUserData
  };
}
