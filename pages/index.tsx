import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { detect } from 'detect-browser'
import InCorrectDevice from '../core/components/Error/InCorrectDevice'
import { authContext } from '../core/context/auth_context'

const Home = () => {
  const browser = detect();
  const router = useRouter()
  const contextUser = useContext(authContext)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      }, 
      function error(msg) { alert('กรุณาเปิดการเข้าถึงตำแหน่งที่ตั้งของคุณ'); },
      { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true });
    }
    contextUser.getOneUser()
  }, [contextUser, latitude, longitude])

  if (browser.os === 'Android OS' || browser.os === 'iOS') {
    return (
      <div onClick={() => router.push("/restaurant")}>
        Hi I'm Parfet {latitude} {longitude}
      </div>
    )
  }
  else {
    return <InCorrectDevice />
  }

}

export default Home
