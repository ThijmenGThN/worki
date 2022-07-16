import Head from 'next/head'
import { SessionProvider } from "next-auth/react"

import '/styles/globals.css'

export default function _app({Component, pageProps: { session, ...pageProps }}) {
  return (
    <>
      <Head>
        <title>worki</title>
        <meta name="description" content="Schedule and manage work shifts" />
        <link rel="icon" href="/assets/icons/favicon.ico" />
        <link rel= "manifest" href="manifest.json" />
      </Head>

      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
