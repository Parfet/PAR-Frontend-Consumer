import api from '../../../utils/api'
import { Party } from '../../../core/constant/type'

const apiParty = {
  getPartyByRestaurantId: async (restaurantId :string) => {
    const response = await api.get(`/party/${restaurantId}`)
    return response
  },
  getPartyByPartyId: async (partyId :string) => {
    const response = await api.get(`/party/info/${partyId}`)
    console.log("🚀 ~ file: apiParty.tsx ~ line 11 ~ getPartyByPartyId: ~ response", response)
    return response
  },
  createParty: async (restaurantId :string, party :Party) => {
    const data = {
      "head_party": party.head_party,
      "party_name": party.party_name,
      "party_type": party.party_type,
      "passcode": party.passcode,
      "interested_topic": party.interested_topic,
      "interested_tag": party.interested_tag,
      "max_member": party.max_member,
      "schedule_time": party.schedule_time
    }
    const response = await api.post(`/party/${restaurantId}`, data)
    return response
  },
}

export default apiParty