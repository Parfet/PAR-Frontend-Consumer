import '../styles/tailwind.css'
import 'dayjs/locale/th'

import React, { useEffect, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';

import Meta from '../core/components/Meta'
import { AuthProvider } from '../core/config/auth'
import InCorrectDevice from '../core/components/Error/InCorrectDevice'

const MyApp = ({ Component, pageProps }) => {
  const [checkPWA, setCheckPWA] = useState(true)

  useEffect(() => {
    if(window.matchMedia('(display-mode: standalone)').matches){
      setCheckPWA(true)
    }
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AuthProvider>
      <Meta />
      <CssBaseline />
      {
        checkPWA ?
        <Component {...pageProps} />
        : <InCorrectDevice/>
      }
    </AuthProvider>
  )
}

export default MyApp
