import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Image from 'next/image'
import { SignalWifiOffOutlined } from '@material-ui/icons';

import Loading from '../core/components/Loading'
import { authContext } from '../core/context/auth_context'
import { useAuth } from '../core/config/auth';
import Navigator from '../core/components/Navigator'
import Home from '../features/Home/pages/'

const Index = () => {
  const router = useRouter()
  const contextUser = useContext(authContext)
  const auth = useAuth();
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')

  useEffect(() => {
    if (auth.user === null || !auth.user) {
      router.push('/signin')
    }else if(auth.user){
      setLoading(false)
      let aryName = auth.user.name.split(/(\s+)/)
      setFirstName(aryName[0])
      if (auth.user.provider === "twitter.com") {
        let aryProfile = auth.user.photoUrl.split('_normal')
        setPhotoUrl(aryProfile[0] + aryProfile[1])
      } else {
        setPhotoUrl(auth.user.photoUrl)
      }
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          contextUser.setLatAndLong(position.coords.latitude, position.coords.longitude)
        },
          function error(msg) { alert('กรุณาเปิดการเข้าถึงตำแหน่งที่ตั้งของคุณ'); },
          { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true });
      }
    }
    
  }, [auth])

  return loading ?
    <Loading />
  : (
      <Navigator 
        rightIcon={
          <IconButton>
            <Image
              alt={firstName + " Photo"}
              src={photoUrl || "/images/logo_parfet_192.png"}
              width={"32px"}
              height={"32px"}
              className="rounded-50"
            />
          </IconButton>
        }
        middleText={firstName}
        >
        <Home />
    </Navigator>
  )

}

export default Index
