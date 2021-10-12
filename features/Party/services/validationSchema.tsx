import * as yup from 'yup'
import { PartyTypeThai } from '../../../core/constant/constant'

export const ValidationFormSchema = yup.object({
  party_name: yup
    .string()
    .min(2, 'ชื่อปาร์ตี้ความยาวอย่างน้อย 2 ตัวอักษร')
    .max(30, 'ชื่อปาร์ตี้ยาวที่สุด 30 ตัวอักษร')
    .required('จำเป็นต้องกรอกชื่อปาร์ตี้'),
  interested_topic: yup
    .string()
    .min(2, 'ชื่อหัวข้อที่ต้องการคุยความยาวอย่างน้อย 2 ตัวอักษร')
    .max(30, 'ชื่อหัวข้อที่ต้องการคุยยาวที่สุด 30 ตัวอักษร')
    .required('จำเป็นต้องกรอกหัวข้อที่ต้องการคุย'),
    interest_tags: yup
    .array()
    .min(1, 'จำเป็นต้องกรอกแท็กที่เกี่ยวข้อง'),
  schedule_time: yup
    .date()
    .required('จำเป็นต้องกรอกวันและเวลาที่ต้องการไป'),
  party_type: yup
    .string()
    .required('จำเป็นต้องกรอกประเภทของปาร์ตี้'),
  max_member: yup
    .string()
    .required('จำเป็นต้องกรอกจำนวนคนสูงสุดของปาร์ตี้'),
  passcode: yup
    .number()
    .when("party_type", {
      is: PartyTypeThai.PRIVATE,
      then: yup.number().required("จำเป็นต้องกรอกรหัสผ่าน")
    })
});