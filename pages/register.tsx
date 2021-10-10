import React, { useEffect } from 'react'
import router from 'next/router';

import Navigator from '../core/components/Navigator'
import Register from '../features/Register/pages';
import { useUser } from '../core/context/auth_context';

const RegisterPages = () => {
  const userContext = useUser();

  useEffect(() => {
    if (!userContext.firstTime) {
      router.replace('/signin')
    } 
  }, [])
  return (
    <Navigator yellow centerAppBar middleText='Register'>
      <Register />
    </Navigator>
  )
}

export default RegisterPages