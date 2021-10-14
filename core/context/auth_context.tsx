import React, { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import { StatusCodes } from 'http-status-codes';
import Cookies from 'universal-cookie'

import { User } from '../constant/type'
import apiAuth from '../services/apiAuth'
import firebase from '../config/firebase';

const cookies = new Cookies()
interface UserContextInterface {
  userData: User
  firstTime: boolean
  latitude: string
  longitude: string
  setLatitude: Function
  setLongitude: Function
  signinWithFacebook: Function
  signinWithTwitter: Function
  signinWithGoogle: Function
  signout: Function
  clearUser: Function
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
  const [firstTime, setFirstTime] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<string>();
  const [longitude, setLongitude] = useState<string>();

  const getUserData = async () => {
    try {
      const response = await apiAuth.getUserData()
      if (response.status === StatusCodes.OK) {
        setUserData(response.data.user)
        console.log("🚀 ~ file: auth_context.tsx ~ line 47 ~ getUserData ~ response.data.user", response.data.user)
      } else {
        setUserData(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;
      cookies.set('access_token', token, { path: '/', maxAge: 3600 })
      cookies.set('refresh_token', rawUser.refreshToken, { path: '/', maxAge: 3600 })
      apiAuth.checkUser().then((response) => {
        console.log("🚀 ~ file: auth_context.tsx ~ line 61 ~ apiAuth.checkUser ~ response", response)
        if (response.data.is_user_existed) {
          setFirstTime(false)
          getUserData().then(() => Router.push('/'))
        } else {
          setFirstTime(true)
          cookies.remove('refresh_token')
          cookies.remove('access_token')
          Router.push('/term');
        }
      }).catch((error) =>
        console.log("🚀 ~ file: auth.js ~ line 36 ~ handleUser ~ error", error)
      )
      setUserData(user);
      return user;
    } else {
      setUserData(null);
      return false;
    }
  };

  const signinWithFacebook = (redirect) => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((response) => {
        handleUser(response.user);

        // if (redirect) {
        //   Router.push(redirect);
        // }
      });
  };

  const signinWithTwitter = (redirect) => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then((response) => {
        handleUser(response.user);

        // if (redirect) {
        //   Router.push(redirect);
        // }
      });
  };

  const signinWithGoogle = (redirect) => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);

        // if (redirect) {
        //   Router.push(redirect);
        // }
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUserData(null)
        handleUser(false)
        cookies.remove('refresh_token')
        cookies.remove('access_token')
        Router.push('/signin')
      });
  };

  const clearUser = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUserData(null)
        cookies.remove('refresh_token')
        cookies.remove('access_token')
      });
  };

  return {
    firstTime,
    userData,
    latitude,
    longitude,
    setLatitude,
    setLongitude,
    getUserData,
    signinWithFacebook,
    signinWithTwitter,
    signinWithGoogle,
    signout,
    clearUser
  };
}

const formatUser = async (user) => {
  // const token = await user.getIdToken(/* forceRefresh */ true);
  const decodedToken = await user.getIdTokenResult(/*forceRefresh*/ true);
  const { token, expirationTime } = decodedToken;
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    refreshToken: user.refreshToken,
    token,
    expirationTime,
    // stripeRole: await getStripeRole(),
  };
};