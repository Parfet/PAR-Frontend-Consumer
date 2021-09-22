import React, { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import firebase from './firebase';
import Cookies from 'universal-cookie'

import apiAuth from '../services/apiAuth'

const cookies = new Cookies()

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useFirebaseAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;
      cookies.set('access_token', token, { path: '/', maxAge: 3600 })
      cookies.set('refresh_token', rawUser.refreshToken, { path: '/', maxAge: 3600 })
      apiAuth.checkUser().then((response) => {
        if (response.data.is_user_existed || response.data.user) {
          Router.push('/');
        }else {
        Router.push('/register');
        }
      }).catch((error) =>
        console.log("🚀 ~ file: auth.js ~ line 36 ~ handleUser ~ error", error)
      )
      setUser(user);
      setLoading(false);
      return user;
    } else {
      setUser(false);
      setLoading(false);
      return false;
    }
  };

  const signinWithFacebook = (redirect) => {
    setLoading(true);
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
    setLoading(true);
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
    setLoading(true);
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
        setUser(null)
        handleUser(false)
        cookies.remove('access_token')
        Router.push('/signin')
      });
  };

  return {
    user,
    loading,
    signinWithFacebook,
    signinWithTwitter,
    signinWithGoogle,
    signout,
  };
}

// const getStripeRole = async () => {
//   await firebase.auth().currentUser.getIdToken(true);
//   const decodedToken = await firebase.auth().currentUser.getIdTokenResult();
//   return decodedToken.claims.stripeRole || 'free';
// };

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
    token,
    expirationTime,
    // stripeRole: await getStripeRole(),
  };
};

export const getFreshToken = async () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken(false);
    cookies.set('access_token', token, { path: '/', maxAge: 3600 })
    cookies.set('refresh_token', currentUser.refreshToken, { path: '/', maxAge: 3600 })
    return `${token}`;
  } else {
    return '';
  }
};