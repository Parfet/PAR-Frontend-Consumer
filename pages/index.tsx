import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { IconButton } from '@material-ui/core';
import Image from 'next/image'
import Cookies from 'universal-cookie'

import Loading from '../core/components/Loading'
import { useAuth } from '../core/config/auth';
import { useUser } from '../core/context/auth_context';
import Navigator from '../core/components/Navigator'
import Home from '../features/Home/pages/'

const cookies = new Cookies()

const Index = () => {
  const router = useRouter()
  const auth = useAuth();
  const userContext = useUser();
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')

  useEffect(() => {
    (async () => {
      if (userContext.userData === null) {
        if (cookies.get("access_token")) {
          await userContext.getUserData()
          setLoading(false)
        } else {
          router.push('/signin')
        }
      } else {
        setUsername(userContext.userData.username)
        if (userContext.userData.provider === "twitter.com") {
          let aryProfile = userContext.userData.image_url.split('_normal')
          setPhotoUrl(aryProfile[0] + aryProfile[1])
        } else {
          setPhotoUrl(userContext.userData.image_url)
        }
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition((position) => {
            userContext.setLatitude(position.coords.latitude)
            userContext.setLongitude(position.coords.longitude)
          },
            function error(msg) { alert('กรุณาเปิดการเข้าถึงตำแหน่งที่ตั้งของคุณ'); },
            { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true });
        }
        setLoading(false)
      }
    })()
  }, [loading])

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
