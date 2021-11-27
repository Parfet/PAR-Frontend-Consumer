import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { IconButton } from '@material-ui/core';
import Image from 'next/image'
import Cookies from 'universal-cookie'

import Loading from '../core/components/Loading'
import { useUser } from '../core/context/auth_context';
import Navigator from '../core/components/Navigator'
import Home from '../features/Home/pages/'
import NavDrawer from '../features/Home/components/NavDrawer'


const cookies = new Cookies()

const Index = () => {
  const router = useRouter()
  const userContext = useUser();
  const [loading, setLoading] = useState(true)
  const [displayName, setDisplayName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    (async () => {
      console.log("🚀 ~ file: index.tsx ~ line 26 ~ userContext.userData", userContext.userData)
      if (userContext.userData === null) {
        if (cookies.get("access_token")) {
          await userContext.getUserData()
          setLoading(false)
        } else {
          router.push('/signin')
        }
      } else {
        setDisplayName(userContext.userData.display_name)
        // if (userContext.userData.provider === "twitter.com") {
        //   let aryProfile = userContext.userData.image_url.split('_normal')
        //   setPhotoUrl(aryProfile[0] + aryProfile[1])
        // } else {
        setPhotoUrl(userContext.userData.image_url)
        setLoading(false)
      }
    })()
  }, [loading])

  const callBackFormFilter = (value) => {
    setOpen(value)
  }

  const handleOpenNav = () => {
    setOpen(!open)
  }

  return loading ?
    <Loading />
    : (
      <Navigator
        rightIcon={
          <IconButton onClick={handleOpenNav}>
            <Image
              alt={displayName + " Photo"}
              src={photoUrl || "/images/logo_parfet_192.png"}
              width={"32px"}
              height={"32px"}
              className="rounded-50"
            />
          </IconButton>
        }
        middleText={displayName}
      >
        <>
          <NavDrawer open={open} callBackFormFilter={callBackFormFilter}/>
          <Home />
        </>
      </Navigator>
    )

}

export default Index
