import api from '../../../utils/api'
import { Party } from '../../../core/constant/type'

const apiParty = {
  getPartyByRestaurantId: async (restaurantId: string) => {
    const response = await api.get(`/party/${restaurantId}`)
    return response
  },
  getPartyByPartyId: async (partyId: string) => {
    const response = await api.get(`/party/info/${partyId}`)
    return response
  },

    createParty: async (restaurantId: string, party: Party) => {
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
  joinParty: async (partyId: string, userId: string, passcode: string) => {
    const data = {
      "user_id": userId,
      "passcode": passcode,
    }
    const response = await api.post(`/party/info/${partyId}/join`, data)
    return response
  },
  getUserJoinParty: async (partyId: string) => {
    const response = await api.get(`/party/info/${partyId}/join`)
    return response
  },
  archivedParty: async (partyId: string) => {
    const response = await api.post(`/party/info/${partyId}`)
    return response
  },
  handleMemberRequest: async (partyId: string, userId: string, status: string) => {
    const data = {
      "user_id": userId,
      "status": status,
    }
    const response = await api.put(`/party/info/${partyId}/join`, data)
    return response
  },
  updateParty: async (party: Party, partyId: string) => {
    const data = {
      "party_name": party.party_name,
      "head_party": party.head_party,
      "passcode": party.passcode,
      "party_type": party.party_type,
      "interested_topic": party.interested_topic,
      "interested_tag": party.interested_tag,
      "max_member": party.max_member,
      "schedule_time": party.schedule_time
    }
    const response = await api.put(`/party/info/${partyId}`, data)
    return response
  },
}

export default apiParty