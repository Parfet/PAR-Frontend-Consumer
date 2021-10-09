import React, { useEffect } from 'react'
import router from 'next/router';

import { useAuth } from '../core/config/auth';
import Navigator from '../core/components/Navigator'
import Register from '../features/Register/pages';
import { useUser } from '../core/context/auth_context';

const RegisterPages = () => {
  const auth = useAuth();
  const userContext = useUser();

  useEffect(() => {
    if (auth.user == null) {
      router.replace('/signin')
    } else if (userContext.userData){
      router.replace('/')
    }
  }, [])
  return (
    <Navigator yellow centerAppBar middleText='Register'>
      <Register />
    </Navigator>
  )
}

export default RegisterPages