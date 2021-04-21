
import dayjs from 'dayjs'

let datenow = dayjs().format("DD/MMM/YYYY HH:mm ")

export const aryPromotion = ["มา 3 จ่าย 4", "มา 10 ลด 20 %"]
export const restaurantMock = ["ติดมัน", "Animal", "นัดแซ่บ", "แจ่วแจ๋ว", "2get"]
export const interestTag = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Developer', label: 'Developer' },
  { value: 'แมว', label: 'แมว' },
  { value: 'หมา', label: 'หมา' },
  { value: 'เรื่อยเปื่อย', label: 'เรื่อยเปื่อย' }
]

export const mockParty = [
  {
    partyId: "95596c42-1c1d-4a6a-b7d0-188cae11e297",
    partyName: "อะไรดี",
    restaurantName: "ติดมัน",
    timeToGo: datenow,
    promotion: "มา 4 จ่าย 3 ลด 100 บาท",
    interestTag: ["Technology", "Developer", "แมว", "หมา", "เรื่อยเปื่อย"],
    currentMember: 1,
    maxMember: 5,
    partyType: "PUBLIC"
  },
  {
    partyId: "99729253-aea7-4729-a5c5-27e1e92675dd",
    partyName: "อะไรดี",
    restaurantName: "ติดมัน",
    timeToGo: datenow,
    promotion: "มา 4 จ่าย 3 ลด 100 บาท",
    interestTag: ["เรื่อยเปื่อย", "หมา", "แมว", "Technology", "Developer"],
    currentMember: 1,
    maxMember: 5,
    partyType: "PRIVATE"
  },
  {
    partyId: "95596c42-1c1d-4a6a-b7d0-188cae11e297",
    partyName: "อะไรดี",
    restaurantName: "ติดมัน",
    timeToGo: datenow,
    promotion: "มา 4 จ่าย 3 ลด 100 บาท",
    interestTag: ["Technology", "Developer", "แมว", "หมา", "เรื่อยเปื่อย"],
    currentMember: 1,
    maxMember: 5,
    partyType: "PRIVATE"
  },
  {
    partyId: "99729253-aea7-4729-a5c5-27e1e92675dd",
    partyName: "อะไรดี",
    restaurantName: "ติดมัน",
    timeToGo: datenow,
    promotion: "มา 4 จ่าย 3 ลด 100 บาท",
    interestTag: ["เรื่อยเปื่อย", "หมา", "แมว", "Technology", "Developer"],
    currentMember: 1,
    maxMember: 5,
    partyType: "PUBLIC"
  },
  {
    partyId: "95596c42-1c1d-4a6a-b7d0-188cae11e297",
    partyName: "อะไรดี",
    restaurantName: "ติดมัน",
    timeToGo: datenow,
    promotion: "มา 4 จ่าย 3 ลด 100 บาท",
    interestTag: ["Technology", "Developer", "แมว", "หมา", "เรื่อยเปื่อย"],
    currentMember: 1,
    maxMember: 5,
    partyType: "PUBLIC"
  },
  {
    partyId: "99729253-aea7-4729-a5c5-27e1e92675dd",
    partyName: "อะไรดี",
    restaurantName: "ติดมัน",
    timeToGo: datenow,
    promotion: "มา 4 จ่าย 3 ลด 100 บาท",
    interestTag: ["เรื่อยเปื่อย", "หมา", "แมว", "Technology", "Developer"],
    currentMember: 1,
    maxMember: 5,
    partyType: "PUBLIC"
  },
]

export const mockPartyMember = [
  {
    imageURL: "/images/tidmun.webp",
    username: "Sun",
    rating: 1
  },
  {
    imageURL: "/images/tidmun.webp",
    username: "Zun",
    rating: 2
  },
  {
    imageURL: "/images/tidmun.webp",
    username: "Sun",
    rating: 3
  },
  {
    imageURL: "/images/tidmun.webp",
    username: "Zun",
    rating: 4
  },
  {
    imageURL: "/images/tidmun.webp",
    username: "Sun",
    rating: 5
  },
  {
    imageURL: "/images/tidmun.webp",
    username: "Zun",
    rating: 4
  },
  {
    imageURL: "/images/tidmun.webp",
    username: "Sun",
    rating: 2
  },
  {
    imageURL: "/images/tidmun.webp",
    username: "Zun",
    rating: 1
  },
]