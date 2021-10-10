import React, { useEffect } from 'react'
import router from 'next/router';

import { useUser } from '../core/context/auth_context';
import Navigator from '../core/components/Navigator'
import Term from '../features/Term/page';

const TermPages = () => {
  const userContext = useUser();

  useEffect(() => {
    if (!userContext.firstTime) {
      router.replace('/signin')
    } 
  }, [])

  return (
    <Navigator yellow centerAppBar middleText='เงื่อนไขในการใช้งาน'>
      <Term />
    </Navigator>
  )
}

export default TermPages