import axios from 'axios'
import Cookies from 'universal-cookie'
import Router from 'next/router'

import firebase from '../core/config/firebase';
import { ErrorMessage } from '../core/constant/constant'

const cookies = new Cookies()

// eslint-disable-next-line no-unused-vars
const createInstance = (headers) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_CONSUMER_API,
    headers: {
      Authorization: `${cookies.get('access_token')}`,
      'Content-Type': 'application/json'
    }
  })
}

const handleResponse = (res) =>
  !res.data.error ? Promise.resolve(res) : Promise.reject(new Error(res))

const catchError = async (err) => {
  if (err.response.data.message === ErrorMessage.TOKEN_EXPIRE){
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken(false);
        await cookies.set('access_token', token, { path: '/', maxAge: 3600 })
        await cookies.set('refresh_token', user.refreshToken, { path: '/', maxAge: 3600 })
        err.config.headers['Authorization'] = token
        axios.request(err.config)
      }
    });
  }else if (err.response.data.message === ErrorMessage.INVALID_TOKEN){
    Router.push('/signin')
  }else{
    return err
  }
}

export default {
  get: (path, headers = {}) =>
    createInstance(headers).get(path).then(handleResponse).catch(catchError),
  post: (path, body = {}, headers = {}) =>
    createInstance(headers)
      .request({
        url: path,
        method: 'POST',
        data: body
      })
      .then(handleResponse)
      .catch(catchError),
  put: (path, body = {}, headers = {}) =>
    createInstance(headers)
      .request({
        url: path,
        method: 'PUT',
        data: body
      })
      .then(handleResponse)
      .catch(catchError),
  patch: (path, body = {}, headers = {}) =>
    createInstance(headers)
      .request({
        url: path,
        method: 'PATCH',
        data: body
      })
      .then(handleResponse)
      .catch(catchError),
  delete: (path, body = {}, headers = {}) =>
    createInstance(headers)
      .request({
        url: path,
        method: 'DELETE',
        data: body
      })
      .then(handleResponse)
      .catch(catchError)
}