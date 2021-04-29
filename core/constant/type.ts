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

export type Restaurant = {
  restaurant_id :string
  restaurant_name :string
  email :string
  tel_no :string
  verify_status :boolean
  status :string
  rating :number
  price :number
  opened_time: string
  closed_time: string
  promotion :string[]
  max_member :number
  schedule_time :string
}

export type Member = {
  member_id: string
}