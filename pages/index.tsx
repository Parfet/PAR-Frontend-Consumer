import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const Screen = styled.div`
  overflow-x: hidden;
`
const Home = () => {
  const router = useRouter()

  useEffect(() => {
    router.push("/party")
  }, [])

  return (
    <Screen>
      Hi
    </Screen>
  )
}

export default Home
