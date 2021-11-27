import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'

import UserPage from '../../features/User/page';
import Navigator from '../../core/components/Navigator'
import { useUser } from '../../core/context/auth_context';

const cookies = new Cookies()

const user = () => {
	const router = useRouter();
  const userContext = useUser();

	useEffect(() => {
    (async () => {
      if (userContext.userData === null) {
        if (cookies.get("access_token")) {
          await userContext.getUserData()
        } else {
          router.push('/signin')
        }
      }
    })()
  }, [])

  return (
  	<Navigator
      yellow 
      backTextButton='กลับ'
      backRoute={() => router.push('/')}
      middleText='ผู้ใช้งาน'
	  >
	    <UserPage/>
		</Navigator>   
	)

}

export default user