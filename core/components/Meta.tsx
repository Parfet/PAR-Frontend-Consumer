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
    <link href="/images/splashscreens/iphone5_splash.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
    <link href="/images/splashscreens/iphone6_splash.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
    <link href="/images/splashscreens/iphoneplus_splash.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
    <link href="/images/splashscreens/iphonex_splash.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
    <link href="/images/splashscreens/iphonexr_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
    <link href="/images/splashscreens/iphonexsmax_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
    <link href="/images/splashscreens/iphonexsmax_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
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