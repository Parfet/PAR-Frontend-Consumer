import React, { useEffect } from 'react'
import router from 'next/router';

import { useAuth } from '../core/config/auth';
import { useUser } from '../core/context/auth_context';
import Navigator from '../core/components/Navigator'
import Term from '../features/Term/page';

const TermPages = () => {
  const auth = useAuth();
  const userContext = useUser();

  useEffect(() => {
    if(auth.user == null){
      router.replace('/signin')
    }else if (userContext.userData) {
      router.replace('/')
    }
  }, [])

  return (
    <Navigator yellow centerAppBar middleText='เงื่อนไขในการใช้งาน'>
      <Term />
    </Navigator>
  )
}

export default TermPages