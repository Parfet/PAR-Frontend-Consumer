import React from 'react'
import { useRouter } from 'next/router'
import { detect } from 'detect-browser'

import InCorrectDevice from '../core/components/Error/InCorrectDevice'

const Home = () => {
  const browser = detect();
  const router = useRouter()

  if (browser.os === 'Android OS' || browser.os === 'iOS') {
    return (
      <div onClick={() => router.push("/party")}>
        Hi I'm Parfet
      </div>
    )
  }
  else {
    return <InCorrectDevice />
  }

}

export default Home
