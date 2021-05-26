import '../styles/tailwind.css'
import 'dayjs/locale/th'

import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';

import Meta from '../core/components/Meta'

const MyApp = ({ Component, pageProps }) => {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Meta />
      <CssBaseline />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
