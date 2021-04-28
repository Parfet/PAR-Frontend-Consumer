import api from '../../../utils/api'

const apiParty = {
  getPartyByRestaurantId: async () => {
    const response = await api.get(`/party`)
    return response
  },
}

export default apiParty