import api from '../../../utils/api'

const apiParty = {
  getPartyByRestaurantId: async (restaurantId :string) => {
    const response = await api.get(`/party/${restaurantId}`)
    return response
  },
}

export default apiParty