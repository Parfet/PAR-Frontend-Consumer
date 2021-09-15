import api from '../../../utils/api'

const apiRegister = {
  register: async (userData) => {
    const data = {
      username: userData.username,
      email: userData.email,
      provider: userData,
      display_name: userData.displayName,
      first_name: userData.firstName,
      last_name: userData.lastName,
      image_url: userData.photoUrl
    }
    console.log("🚀 ~ file: apiRegister.tsx ~ line 14 ~ register: ~ data", data)
    const response = await api.post(`/auth/register`)
    return response
  },
}

export default apiRegister