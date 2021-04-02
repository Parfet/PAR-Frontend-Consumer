import '../styles/tailwind.css'
import 'dayjs/locale/th'

import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';

import Meta from '../core/components/Meta'

const MyApp = ({ Component, pageProps }) => {
// 
  return (
    <>
      <Meta />
      <CssBaseline />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
