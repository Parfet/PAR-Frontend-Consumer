export type Party = {
  party_id: string
  party_name?: string
  head_party?: User | string
  party_type?: string
  interested_topic?: string
  interest_tags?: Tag[]
  restaurant_name?: string
  promotion?: string
  passcode?: string
  members?: User[]
  max_member?: number
  schedule_time?: string
  created_at?: string
  archived_at?: string
}

export type Restaurant = {
  restaurant_id: string
  restaurant_name?: string
  email?: string
  tel_no?: string
  verify_status?: boolean
  status?: string
  rating?: number
  price?: number
  opened_time?: string
  closed_time?: string
  promotion?: string[]
  max_member?: number
  schedule_time?: string
}

export type User = {
  user_id: string
  username?: string
  email?: string
  first_name_th?: string
  last_name_th?: string
  first_name_en?: string
  last_name_en?: string
  tel_no?: string
  verify_status?: boolean
  interest_tags?: string[]
  image_url?: string
  rating?: number,
}

export type Tag = {
  value: string
  label: string
}