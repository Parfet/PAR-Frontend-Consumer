import React, { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import { StatusCodes } from 'http-status-codes';
import Cookies from 'universal-cookie'

import { User, Location } from '../constant/type'
import apiAuth from '../services/apiAuth'
import firebase from '../config/firebase';

const cookies = new Cookies()

interface UserContextInterface {
  userData: User
  firstTime: boolean
  location: Location
  setLocation: Function
  getLocation: Function
  signinWithFacebook: Function
  signinWithTwitter: Function
  signinWithGoogle: Function
  signout: Function
  clearUser: Function
  getUserData: Function
  register: Function
  loading: Boolean
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
  const [location, setLocation] = useState <Location>({ lat: 0, lng: 0 })
  const [checkPWA, setCheckPWA] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setCheckPWA(true)
    }
    if (checkPWA) {
      firebase
      .auth()
      .getRedirectResult()
      .then((response) => {
          setLoading(true)
          handleUser(response.user);
        })
    }
  }, [firebase, checkPWA])

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
      cookies.set('refresh_token', rawUser.refreshToken, { path: '/', maxAge: 7200 })
      apiAuth.checkUser().then((response) => {
        console.log("🚀 ~ file: auth_context.tsx ~ line 61 ~ apiAuth.checkUser ~ response", response)
        if (response.data.is_user_existed) {
          setFirstTime(false)
          // setLoading(false)
          // getUserData().then(() => Router.push('/'))
        } else {
          setFirstTime(true)
          setLoading(false)
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

  const signinWithFacebook = () => {
    if (checkPWA) {
      return firebase
        .auth()
        .signInWithRedirect(new firebase.auth.FacebookAuthProvider())
    }else{
      return firebase
        .auth()
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((response) => {
          handleUser(response.user);
        })
    }
  };

  const signinWithTwitter = () => {
    if (checkPWA) {
      return firebase
        .auth()
        .signInWithRedirect(new firebase.auth.TwitterAuthProvider())
    } else {
      return firebase
        .auth()
        .signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then((response) => {
          handleUser(response.user);
        })
    }
  };

  const signinWithGoogle = () => {
    if (checkPWA) {
      return firebase
        .auth()
        .signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    } else {
      return firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((response) => {
          handleUser(response.user);
        })
    }
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
        setLoading(false)
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
        setLoading(false)
      });
  };

  const getLocation = async () => {
    navigator.geolocation.watchPosition(async (position) => {
      setLocation({
        lat: await position.coords.latitude,
        lng: await position.coords.longitude
      })
    },
      function error(msg) {
        console.log("🚀 ~ file: auth_context.tsx ~ line 178 ~ error ~ msg", msg)
        return true
      },
      { maximumAge: 10000, enableHighAccuracy: true });
    return false
  }

  const register = async (userData) => {
    const response = await apiAuth.register(userData)
    if (response.response && response.response.status === StatusCodes.BAD_REQUEST){
      return response.response.data
    } else if (response.status === StatusCodes.NO_CONTENT){
      console.log("🚀 ~ file: auth_context.tsx ~ line 190 ~ register ~ response", response)
      return response
    }
    return null
  }

  return {
    firstTime,
    userData,
    location,
    setLocation,
    getLocation,
    getUserData,
    signinWithFacebook,
    signinWithTwitter,
    signinWithGoogle,
    signout,
    clearUser,
    register,
    loading
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