import '../styles/tailwind.css'
import 'dayjs/locale/th'

import React, { useEffect, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { detect } from 'detect-browser'

import Meta from '../core/components/Meta'
import { AuthProvider } from '../core/config/auth'
import InCorrectDevice from '../core/components/Error/InCorrectDevice'
import InstallPWA from '../core/components/Error/InstallPWA'

const MyApp = ({ Component, pageProps }) => {
  const browser = detect();

  const [checkPWA, setCheckPWA] = useState(false)
  const [checkMobile, setCheckMobile] = useState(true)

  useEffect(() => {
    if(window.matchMedia('(display-mode: standalone)').matches){
      setCheckPWA(true)
    }
    if(browser.os == "Windows 10" || browser.os == "Mac OS" ){
      setCheckMobile(false)
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
        checkMobile ? 
          checkPWA ?
          <Component {...pageProps} />
            :<InstallPWA/>
          :<InCorrectDevice />
      }
    </AuthProvider>
  )
}

export default MyApp
