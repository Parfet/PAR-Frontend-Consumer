import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'

import Loading from '../core/components/Loading'
import { authContext } from '../core/context/auth_context'
import { useAuth } from '../core/config/auth';
import Navigator from '../core/components/Navigator'

const Home = () => {
  const router = useRouter()
  const contextUser = useContext(authContext)
  const auth = useAuth();
  const [loading, setLoading] = useState(true)
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
    }else if(auth.user){
      setLoading(false)
    }
    contextUser.getAllUser()
  }, [contextUser, auth])

  return loading ?
    <Loading />
  : (
      <Navigator 
        middleText="Mock"
        >
      <> Home {auth.user.name} </>
    </Navigator>
  )

}

export default Home
