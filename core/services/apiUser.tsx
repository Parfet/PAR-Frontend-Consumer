import api from '../../utils/api'

const apiUser = {
  getUser: async () => {
    const response = await api.get('/user')
    return response
  },
}

export default apiUser