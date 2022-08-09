import Head from 'next/head'
import { SessionProvider } from "next-auth/react"
import { useState, useEffect } from "react"

import '/styles/globals.css'

import NavBar from '/source/components/interface/NavBar'
import Controls from '/source/components/interface/Controls'

export default function _app({Component, pageProps: { session, ...pageProps }}) {
  const [inApp, setInApp] = useState(false)

  useEffect(() => setInApp(window.location.pathname.includes('app')))

  return (
    <>
      <Head>
        <title>worki</title>
        <meta name="description" content="Schedule and manage work shifts" />
        <link rel="icon" href="/assets/icons/favicon.ico" />
        <link rel= "manifest" href="manifest.json" />
      </Head>

      <SessionProvider session={session}>
        { inApp ? <NavBar /> : null }

        <Component {...pageProps} />

        { inApp ? <Controls /> : null }
      </SessionProvider>
    </>
  )
}
