import '../styles/tailwind.css'
import 'dayjs/locale/th'

import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';

import Meta from '../core/components/Meta'
import { AuthProvider } from '../core/config/auth'

const MyApp = ({ Component, pageProps }) => {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AuthProvider>
      <Meta />
      <CssBaseline />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
