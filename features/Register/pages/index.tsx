import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Image from 'next/image'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import Cookies from 'universal-cookie'

import { useAuth } from '../../../core/config/auth';
import { Title, SubHeader } from '../../../core/config/textStyle';
import InputField from '../../../core/components/InputField';
import { ValidationFormSchema } from '../services/validationSchema';
import apiRegister from '../services/apiRegister';

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
  const auth = useAuth();
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [provider, setProvider] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [disabled, setDisabled] = useState(false)
  
  useEffect(() => {
    if(auth.user){
      console.log("🚀 ~ file: index.tsx ~ line 62 ~ useEffect ~ auth.user", auth.user)
      if(auth.user.email){
        setDisabled(true)
        setEmail(auth.user.email)
      }
      let aryName = auth.user.name.split(/(\s+)/)
      setFirstName(aryName[0])
      setLastName(aryName[aryName.length-1])
      setProvider(auth.user.provider)
      if (auth.user.provider === "twitter.com"){
        let aryProfile = auth.user.photoUrl.split('_normal')
        setPhotoUrl(aryProfile[0] + aryProfile[1])
      }else {
        setPhotoUrl(auth.user.photoUrl)
      }
    }else{
      router.push('/signin')
    }
  }, [])

  useEffect(() => {
    return () => {
      auth.clearUser()
    };
  }, []);

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
    onSubmit: (values) => {
      apiRegister.register(values).then(() => {
        cookies.set('access_token', auth.user.token, { path: '/', maxAge: 3600 })
        cookies.set('refresh_token', auth.user.refreshToken, { path: '/', maxAge: 3600 })
        router.push('/') 
      })
    },
  });
  return auth.loading && auth.user ?
    <> waiting </>  
    : (
    <form className="flex flex-col justify-center w-screen my-14 px-10" onSubmit={formik.handleSubmit}>
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