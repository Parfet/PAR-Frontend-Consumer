import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { detect } from 'detect-browser'

import InCorrectDevice from '../core/components/Error/InCorrectDevice'

const Home = () => {
  const browser = detect();
  const router = useRouter()

  useEffect(() => {
    if (browser.os === 'Android OS' || browser.os === 'iOS'){
      router.push("/party")
    }
  }, [])

  if (browser.os === 'Android OS' || browser.os === 'iOS') {
    return (
      <div>
        Hi I'm Parfet
      </div>
    )
  }else{
    return <InCorrectDevice />
  }
  
}

export default Home
