import Head from 'next/head'

const Meta = () => (
  <Head>
    <title>PARFET</title>
    <meta charSet='utf-8' />
    <meta name='mobile-web-app-capable' content='yes' />
    <meta name='apple-mobile-web-app-capable' content='yes' />
    <meta name='apple-mobile-web-app-title' content='PARFET' />
    <meta name='application-name' content='PARFET' />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <link rel='apple-touch-icon' href='/images/logo_parfet_512.png' />
    <meta name='description' content='Party Buffet Management' />
    <meta name='theme-color' content='#000000' />
    <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover' />
    {/* <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" /> */}
    {/* <meta http-equiv="Pragma" content="no-cache" /> */}
    <link rel='icon' type='image/png' href='/images/favicon.png' />
    <link rel='manifest' href='/manifest.json' />
  </Head>
)

export default Meta