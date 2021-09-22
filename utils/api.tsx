import axios from 'axios'
import Cookies from 'universal-cookie'

import { getFreshToken } from '../core/config/auth'
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

const catchError = (err) => {
  if (err.response.data.message === ErrorMessage.TOKEN_EXPIRE){
    getFreshToken()
  }else{
    Promise.reject(err)
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