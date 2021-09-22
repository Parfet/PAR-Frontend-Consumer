import api from '../../utils/api'

const apiUser = {
  getUserData: async () => {
    const response = await api.get('/user/me')
    return response
  },
  checkUser: async () => {
    const response = await api.get('/auth/check')
    return response
  },
}

export default apiUser