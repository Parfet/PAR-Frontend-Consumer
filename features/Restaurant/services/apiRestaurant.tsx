import api from '../../../utils/api'

const apiRestaurant = {
  getAllRestaurants: async (param) => {
    console.log("🚀 ~ file: apiRestaurant.tsx ~ line 5 ~ getAllRestaurants: ~ param", param)
    const response = await api.get(`/restaurant?${param}`)
    return response
  },
}

export default apiRestaurant