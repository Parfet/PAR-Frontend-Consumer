import api from '../../utils/api'

const apiUser = {
  getUser: async () => {
    const response = await api.get('/user')
    return response
  },
  getJWTToken: async (data) => {
    const response = await api.post('/auth/token', data)
    return response
  },
}

export default apiUser