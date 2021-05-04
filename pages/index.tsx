import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { detect } from 'detect-browser'

import InCorrectDevice from '../core/components/Error/InCorrectDevice'
import { authContext } from '../core/context/auth_context'

const Home = () => {
  const browser = detect();
  const router = useRouter()
  const contextUser = useContext(authContext)

  useEffect(() => {
    contextUser.getOneUser()
  }, [contextUser])

  if (browser.os === 'Android OS' || browser.os === 'iOS') {
    return (
      <div onClick={() => router.push("/restaurant")}>
        Hi I'm Parfet
      </div>
    )
  }
  else {
    return <InCorrectDevice />
  }

}

export default Home
