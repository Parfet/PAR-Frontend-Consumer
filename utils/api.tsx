import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

// eslint-disable-next-line no-unused-vars
const createInstance = (headers) => {
  return axios.create({
    baseURL: publicRuntimeConfig.API_URL,
    headers: {
      Authorization: `Bearer ${cookies.get('token')}`,
      'Content-Type': 'application/json'
    }
  })
}

const handleResponse = (res) =>
  !res.data.error ? Promise.resolve(res) : Promise.reject(new Error(res))

const catchError = (err) => Promise.reject(err)

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