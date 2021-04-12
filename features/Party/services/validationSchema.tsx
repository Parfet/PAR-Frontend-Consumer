import * as yup from 'yup'
import { partyType } from '../../../core/config/constant'

export const ValidationFormSchema = yup.object({
  partyName: yup
    .string()
    .min(2, 'ชื่อปาร์ตี้ความยาวอย่างน้อย 2 ตัวอักษร')
    .max(30, 'ชื่อปาร์ตี้ยาวที่สุด 30 ตัวอักษร')
    .required('จำเป็นต้องกรอกชื่อปาร์ตี้'),
  partyTopic: yup
    .string()
    .min(2, 'ชื่อหัวข้อที่ต้องการคุยความยาวอย่างน้อย 2 ตัวอักษร')
    .max(30, 'ชื่อหัวข้อที่ต้องการคุยยาวที่สุด 30 ตัวอักษร')
    .required('จำเป็นต้องกรอกหัวข้อที่ต้องการคุย'),
  tags: yup
    .array()
    .required('จำเป็นต้องกรอกแท็กที่เกี่ยวข้อง'),
  restaurant: yup
    .string()
    .required('จำเป็นต้องกรอกร้านอาหาร'),
  promotion: yup
    .string()
    .required('จำเป็นต้องกรอกโปรโัมชั่น'),
  datetime: yup
    .date()
    .required('จำเป็นต้องกรอกวันและเวลาที่ต้องการไป'),
  partyType: yup
    .string()
    .required('จำเป็นต้องกรอกประเภทของปาร์ตี้'),
  maxMember: yup
    .string()
    .required('จำเป็นต้องกรอกจำนวนคนสูงสุดของปาร์ตี้'),
  password: yup
    .number()
    .when("partyType", {
      is: partyType.PRIVATE,
      then: yup.number().required("จำเป็นต้องกรอกรหัสผ่าน")
    })
});