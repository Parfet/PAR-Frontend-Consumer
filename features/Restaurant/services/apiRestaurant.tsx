import api from '../../../utils/api'

const apiRestaurant = {
  getAllRestaurants: async () => {
    const response = await api.get(`/restaurant`)
    return response
  },
}

export default apiRestaurant