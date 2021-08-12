import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { detect } from 'detect-browser'
import { TextField, Button } from '@material-ui/core'
import { useFormik } from 'formik';

import InCorrectDevice from '../core/components/Error/InCorrectDevice'
import { authContext } from '../core/context/auth_context'
import { useAuth } from '../core/config/auth';

const Home = () => {
  const browser = detect();
  const router = useRouter()
  const contextUser = useContext(authContext)
  const auth = useAuth();
  // const [latitude, setLatitude] = useState(0)
  // const [longitude, setLongitude] = useState(0)
  
  useEffect(() => {
    // if (navigator.geolocation) {
    //   navigator.geolocation.watchPosition((position) => {
    //     setLatitude(position.coords.latitude)
    //     setLongitude(position.coords.longitude)
    //   }, 
    //   function error(msg) { alert('กรุณาเปิดการเข้าถึงตำแหน่งที่ตั้งของคุณ'); },
    //   { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true });
    // }
    if (auth.user === null || !auth.user) {
      router.push('/signin')
    }
    contextUser.getAllUser()
  }, [contextUser, auth])

  const formik = useFormik({
    initialValues: {
      username: ''
    },
    onSubmit: (values) => {
      contextUser.login(values.username)
    },
  });


  if (browser.os === 'Android OS' || browser.os === 'iOS') {
    return (
      <div className="flex items-center justify-center p-4 h-screen">
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <TextField
            id="username"
            name="username"
            variant="outlined"
            size="small"
            value={formik.values.username}
            onChange={formik.handleChange}
            // required
          />
          <Button type="submit"> เข้าสู่ระบบ</Button>
          {
            auth.user != null ?
              <> {auth.user.name} </> : <></>
          }
        </form>
      </div>
    )
  }
  else {
    return <InCorrectDevice />
  }
}

export default Home
