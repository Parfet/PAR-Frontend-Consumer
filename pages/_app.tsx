import '../styles/globals.css'
import Meta from '../core/components/Meta'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Meta />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
