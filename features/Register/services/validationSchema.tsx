import * as yup from 'yup'

export const ValidationFormSchema = yup.object({
  username: yup
    .string()
    .matches(/^[a-zA-Z\-0-9]+$/, "กรุณากรอกชื่อผู้ใช้งานให้ถูกต้อง")
    .required('จำเป็นต้องกรอกชื่อผู้ใช้งาน'),
  displayName: yup
    .string()
    .required('จำเป็นต้องกรอกหัวข้อที่ต้องการคุย'),
  email: yup
    .string()
    .required('จำเป็นต้องกรอกอีเมลล์')
    .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "กรุณากรอกอีเมลล์ให้ถูกต้อง"),
  firstName: yup
    .string()
    .required('จำเป็นต้องกรอกชื่อ'),
  lastName: yup
    .string()
    .required('จำเป็นต้องกรอกนามสกุล'),
});