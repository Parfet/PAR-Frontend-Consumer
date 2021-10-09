import api from '../../../utils/api'

const apiRegister = {
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
}

export default apiRegister