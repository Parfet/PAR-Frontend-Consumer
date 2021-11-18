import api from '../../../utils/api'
import { Party, Restaurant } from '../../../core/constant/type'

const apiParty = {
  getPartyByRestaurantId: async (restaurantId: string) => {
    const response = await api.get(`/party/${restaurantId}`)
    return response
  },
  getPartyByPartyId: async (partyId: string) => {
    const response = await api.get(`/party/info/${partyId}`)
    return response
  },
  getPartyByUserId: async () => {
    const response = await api.get(`/party/me`)
    return response
  },
  getAllTag: async () => {
    const response = await api.get(`/party/tags`)
    return response
  },
  createParty: async (restaurant: Restaurant, party: Party) => {
    const data = {
      "party_name": party.party_name,
      "party_type": party.party_type,
      "passcode": party.passcode,
      "interested_topic": party.interested_topic,
      "interest_tags": party.interest_tags,
      "max_member": party.max_member,
      "schedule_time": party.schedule_time,
      "restaurant_photo_ref": restaurant.photos ? restaurant.photos[0].photo_reference : '',
      "open_chat_link": ""
    }
    console.log("🚀 ~ file: apiParty.tsx ~ line 33 ~ createParty: ~ data", data)
    const response = await api.post(`/party/${restaurant.place_id}`, data)
    return response
  },
  getMyPartyRequest: async () => {
    const response = await api.get(`/party/request/me`)
    return response
  },
  getHistory: async () => {
    const response = await api.get(`/party/history/me`)
    return response
  },
  checkJoinStatus: async (partyId: String) => {
    const data = {
      "party_id": partyId,
    }
    const response = await api.post(`/party/check`, data)
    return response
  },
  joinParty: async (partyId: string, passcode: string) => {
    const data = {
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
  updateParty: async (party: Party, partyId: string, userId?: string) => {
    const data = {
      "party_name": party.party_name,
      "head_party": userId ? userId : party.head_party,
      "passcode": party.passcode,
      "party_type": party.party_type,
      "interested_topic": party.interested_topic,
      "interest_tags": party.interest_tags,
      "max_member": party.max_member,
      "schedule_time": party.schedule_time,
      "open_chat_link": party.open_chat_link
    }
    console.log("🚀 ~ file: apiParty.tsx ~ line 85 ~ updateParty: ~ data", data)
    const response = await api.put(`/party/info/${partyId}`, data)
    console.log("🚀 ~ file: apiParty.tsx ~ line 59 ~ updateParty: ~ partyId", partyId)
    return response
  },
  leaveParty: async (partyId: string) => {
    const response = await api.delete(`/party/${partyId}`)
    return response
  },
  randomParty: async (data) => {
    const response = await api.post(`/party/quick-join`, data)
    return response
  },
  kickMember: async (partyId: string, userId: string) => {
    const data = {
      "user_id": userId,
    }
    const response = await api.delete(`/party/info/${partyId}/member`,data)
    return response
  }
}

export default apiParty