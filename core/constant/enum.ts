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

export enum PartyRequestStatus {
  STATUS_ACCEPT = "ACCEPT",
  STATUS_DECLINE = "DECLINE"
}

export enum RestaurantStatus {
  RESTAURANT_OPEN = "OPEN",
  RESTAURANT_CLOSED = "CLOSED"
}

export const Errors = {
  USER_NOT_FOUND: "User not found",
  PARTY_NOT_FOUND: "Party not found",
  PASSCODE_INCORRECT: "Passcode incorrect",
  ALREADY_JOIN_PARTY: "You already request to join this party",
  PERMISSION_DENIED: "Permission Denied",
}

