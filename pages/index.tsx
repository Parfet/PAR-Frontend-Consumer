import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { IconButton } from '@material-ui/core';
import Image from 'next/image'
import Cookies from 'universal-cookie'

import Loading from '../core/components/Loading'
import { authContext } from '../core/context/auth_context'
import { useAuth } from '../core/config/auth';
import Navigator from '../core/components/Navigator'
import Home from '../features/Home/pages/'

const cookies = new Cookies()

const Index = () => {
  const router = useRouter()
  const contextUser = useContext(authContext)
  const auth = useAuth();
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')

  useEffect(() => {
    (async () => {
      if (contextUser.userData === null) {
        await contextUser.getUserData()
        if (cookies.get("access_token")) {
        } else {
          router.push('/signin')
        }
      }
      setUsername(contextUser.userData.username)
      if (contextUser.userData.provider === "twitter.com") {
        let aryProfile = contextUser.userData.image_url.split('_normal')
        setPhotoUrl(aryProfile[0] + aryProfile[1])
      } else {
        setPhotoUrl(contextUser.userData.image_url)
      }
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          contextUser.setLatAndLong(position.coords.latitude, position.coords.longitude)
        },
          function error(msg) { alert('กรุณาเปิดการเข้าถึงตำแหน่งที่ตั้งของคุณ'); },
          { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true });
      }
      setLoading(false)
    })()   
  }, [loading, contextUser.userData])

  return loading ?
    <Loading />
  : (
      <Navigator 
        rightIcon={
          <IconButton>
            <Image
              alt={username + " Photo"}
              src={photoUrl || "/images/logo_parfet_192.png"}
              width={"32px"}
              height={"32px"}
              className="rounded-50"
            />
          </IconButton>
        }
        middleText={username}
        >
        <Home />
    </Navigator>
  )

}

export default Index
