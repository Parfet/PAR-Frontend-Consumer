
import apiParty from '../../features/Party/services/apiParty'
import api from '../../utils/api'
import { interestTag } from '../config/mockData'

const apiUser = {
  getUserData: async () => {
    const response = await api.get('/user/me')
    return response
  },
  checkUser: async () => {
    const response = await api.get('/auth/check')
    return response
  },
  register: async (userData) => {
    const data = {
      username: userData.username,
      email: userData.email,
      provider: userData.provider,
      display_name: userData.displayName,
      first_name: userData.firstName,
      last_name: userData.lastName,
      image_url: userData.photoUrl,
      accept_term_of_use: true
    }
    const response = await api.post(`/auth/register`, data)
    return response
  },
  updateUser: async (userData) => {
    const response = await api.patch('/user/me', userData)
    return response
  }
}

export default apiUser