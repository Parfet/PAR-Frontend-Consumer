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
        console.log("Latitude is :", position.coords.latitude);
        setLatitude(position.coords.latitude)
        console.log("Longitude is :", position.coords.longitude);
        setLongitude(position.coords.longitude)
        console.log("Coords is :", position.coords);
      }, 
      function error(msg) { alert('Please enable your GPS position feature.'); },
      { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true });
    }
    contextUser.getOneUser()
  }, [contextUser])

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
