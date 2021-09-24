export type Party = {
  party_id?: string
  party_name?: string
  head_party?: User
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
  name?: string
  place_id?: string
  photos?: RestaurantImage[]
  restaurant_id?: string
  restaurant_name?: string
  email?: string
  tel_no?: string
  verify_status?: boolean
  status?: string
  rating?: number
  price?: number
  opened_time?: string
  closed_time?: string
  promotions?: Promotion
  max_member?: number
  schedule_time?: string
}

type RestaurantImage = {
  height: number
  html_attributions: string[]
  photo_reference: string
  width: number
}

export type User = {
  user_id?: string
  username?: string
  display_name?: string
  email?: string
  first_name?: string
  last_name?: string
  verify_status?: boolean
  interest_tags?: string[]
  image_url?: string
  rating?: number
  provider?: string
}

export type Tag = {
  value: string
  label: string
}

export type Promotion = {
  promotion_id?: string
  promotion_title?: string
  promotion_description?: string
  promotion_condition?: string
}

