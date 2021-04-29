export type Party = {
  party_id :string
  party_name :string
  head_party :string
  party_type :string
  interested_topic :string
  interested_tag :string[]
  restaurant_name :string
  promotion :string
  passcode :string
  member :Member[]
  max_member :number
  schedule_time :string
  created_at :string
  archived_at? :string
}

export type Member = {
  member_id: string
}