export enum PartyType {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE"
}

export enum AdminPartyAction {
  GIVE_PERMISSION = "GIVE_PERMISSION",
  KICK = "KICK"
}

export enum PartyAction {
  CLOSE_PARTY = "CLOSE_PARTY",
  LEAVE_PARTY = "LEAVE_PARTY"
}

export enum RestaurantStatus {
  RESTAURANT_OPEN = "OPEN",
  RESTAURANT_CLOSED = "CLOSED"
}

export const Errors = {
  USER_NOT_FOUND: "User not found",
  PARTY_NOT_FOUND: "Party not found",
  PASSCODE_INCORRECT: "Passcode incorrect",
  PERMISSION_DENIED: "Only party owner can view request join party"
}

