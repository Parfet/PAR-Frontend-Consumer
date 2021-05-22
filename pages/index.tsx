import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { detect } from 'detect-browser'
import { TextField, Button } from '@material-ui/core'

import InCorrectDevice from '../core/components/Error/InCorrectDevice'
import { authContext } from '../core/context/auth_context'

const Home = () => {
  const browser = detect();
  const router = useRouter()
  const contextUser = useContext(authContext)
  // const [latitude, setLatitude] = useState(0)
  // const [longitude, setLongitude] = useState(0)
  const [username, setUsername] = useState<string>()

  useEffect(() => {
    // if (navigator.geolocation) {
    //   navigator.geolocation.watchPosition((position) => {
    //     setLatitude(position.coords.latitude)
    //     setLongitude(position.coords.longitude)
    //   }, 
    //   function error(msg) { alert('กรุณาเปิดการเข้าถึงตำแหน่งที่ตั้งของคุณ'); },
    //   { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true });
    // }
    contextUser.getAllUser()
  }, [contextUser])

  if (browser.os === 'Android OS' || browser.os === 'iOS') {
    return (
      <div>
        <form>
          <TextField
            id="party_name"
            name="party_name"
            variant="outlined"
            size="small"
            value={username}
            onBlur={(e) => setUsername(e.target.value)}
            required
          />
          <Button type="submit" onClick={() => contextUser.login(username)}> เข้าสู่ระบบ</Button>
        </form>
        Hi I'm Parfet
      </div>
    )
  }
  else {
    return <InCorrectDevice />
  }

}

export default Home
