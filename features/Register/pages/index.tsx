import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Image from 'next/image'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { StatusCodes } from 'http-status-codes';
import { useFormik } from 'formik';
import Cookies from 'universal-cookie'

import { useUser } from '../../../core/context/auth_context';
import { Title, SubHeader } from '../../../core/config/textStyle';
import { Errors } from '../../../core/constant/enum';
import InputField from '../../../core/components/InputField';
import { ValidationFormSchema } from '../services/validationSchema';

const cookies = new Cookies()

const Background = styled.div`
  background-color: white;
  height: 100vh;
`

const useStyles = makeStyles({
  root: {
    borderRadius: 25,
    borderColor: "#F8CE28",
    [`& fieldset`]: {
      borderRadius: 25,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F8CE28 !important",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F8CE28"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F8CE28"
    },
  },
});

const CreateButton = withStyles(() => ({
  root: {
    borderRadius: 25,
    backgroundColor: "#F8CE28",
    '&:hover': {
      backgroundColor: "#F8CE28",
    },
  },
}))(Button)

const Register = () => {
  const router = useRouter()
  const userContext = useUser();
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [provider, setProvider] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [disabled, setDisabled] = useState(false)
  
  useEffect(() => {
    if (userContext.userData){
      if (userContext.userData.email){
        setDisabled(true)
        setEmail(userContext.userData.email)
      }
      let aryName = userContext.userData.name.split(/(\s+)/)
      setFirstName(aryName[0])
      setLastName(aryName[aryName.length-1])
      setProvider(userContext.userData.provider)
      if (userContext.userData.provider === "twitter.com"){
        let aryProfile = userContext.userData.photoUrl.split('_normal')
        setPhotoUrl(aryProfile[0] + aryProfile[1])
      }else {
        setPhotoUrl(userContext.userData.photoUrl)
      }
    }else{
      router.push('/signin')
    }
  }, [])

  // useEffect(() => {
  //   return () => {
  //     userContext.clearUser()
  //   };
  // }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      provider: provider,
      username: '',
      displayName: '',
      email: email,
      firstName: firstName,
      lastName: lastName,
      photoUrl: photoUrl
    },
    validationSchema: ValidationFormSchema,
    onSubmit: async (values) => {
      console.log("🚀 ~ file: index.tsx ~ line 105 ~ Register ~ userContext.userData", userContext.userData)
      cookies.set('access_token', userContext.userData.token, { path: '/', maxAge: 3600 })
      cookies.set('refresh_token', userContext.userData.refreshToken, { path: '/', maxAge: 3600 })
      const response = await userContext.register(values)
      console.log("🚀 ~ file: index.tsx ~ line 107 ~ Register ~ response", response)
      if (response.message == Errors.USERNAME_ALREADY) {
        formik.touched.username = true
        formik.errors.username = "มีชื่อผู้ใช้งานนี้แล้ว"
      } else if(response.message == Errors.DISPLAY_ALREADY){
        formik.touched.displayName = true
        formik.errors.displayName = "มีชื่อที่ต้องการแสดงนี้แล้ว"
      } else if (response.status == StatusCodes.NO_CONTENT){
        userContext.getUserData().then(() => router.push('/'))
      } else {
        router.push('/signin')
      }
    },
  });
  return (
    <form className="flex flex-col justify-center w-screen my-16 px-10" onSubmit={formik.handleSubmit}>
      <div className="flex justify-center">
        <Image
          alt={firstName + " Photo"}
          src={photoUrl || "/images/logo_parfet_192.png"}
          width={"200px"}
          height={"200px"}
          className="rounded-50"
        />
      </div>
      <InputField label="ชื่อผู้ใช้งาน">
        <TextField
          id="username"
          name="username"
          variant="outlined"
          size="small"
          className={classes.root}
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          >
        </TextField>
      </InputField>
      สามารถมีตัวอักษรได้ดังนี้ A-Z, a-z, 0-9
      <InputField label="ชื่อที่ต้องการแสดง">
        <TextField
          id="displayName"
          name="displayName"
          variant="outlined"
          size="small"
          className={classes.root}
          value={formik.values.displayName}
          onChange={formik.handleChange}
          error={formik.touched.displayName && Boolean(formik.errors.displayName)}
          helperText={formik.touched.displayName && formik.errors.displayName}
        >
        </TextField>
      </InputField>
      <InputField label="อีเมลล์">
        <TextField
          id="email"
          name="email"
          variant="outlined"
          size="small"
          className={classes.root}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
            disabled={disabled}
        >
        </TextField>
      </InputField>
      <InputField label="ชื่อ">
        <TextField
          id="firstName"
          name="firstName"
          variant="outlined"
          size="small"
          className={classes.root}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        >
        </TextField>
      </InputField>
      <InputField label="นามสกุล">
        <TextField
          id="lastName"
          name="lastName"
          variant="outlined"
          size="small"
          className={classes.root}
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        >
        </TextField>
      </InputField>
      <div className="flex justify-center mt-5">
        <CreateButton variant="contained" type="submit">
          <SubHeader className="text-white">
            สมัครสมาชิก
          </SubHeader>
        </CreateButton>
      </div>
    </form>
  )
}

export default Register