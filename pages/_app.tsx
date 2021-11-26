import '../styles/tailwind.css'
import '@culturehq/add-to-calendar/dist/styles.css'
import 'dayjs/locale/th'

import React, { useEffect, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { detect } from 'detect-browser'

import Meta from '../core/components/Meta'
import { UserProvider } from '../core/context/auth_context'
import { PartyProvider } from '../features/Party/contexts/party_context'
import { RestaurantProvider } from '../features/Restaurant/contexts/restaurant_context'
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
    <>
      <Meta />
      <CssBaseline />
      {
        checkMobile ? 
          checkPWA ?
            <UserProvider >
              <RestaurantProvider >
                <PartyProvider >
                  <Component {...pageProps} />
                </PartyProvider>
              </RestaurantProvider>
            </UserProvider>
            :<InstallPWA/>
          :<InCorrectDevice />
      }
    </>
  )
}

export default MyApp
