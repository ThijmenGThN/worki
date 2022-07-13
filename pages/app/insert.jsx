import { useEffect } from 'react'
import { useSession } from "next-auth/react"

import NavBar from '/source/components/NavBar'
import Controls from '/source/components/Controls'

export default function Insert() {
  const { data: session, status } = useSession()

  // Redirect if unauthorized.
  // useEffect(() => { if (status == 'unauthenticated') window.location.replace('/') }, [status])

  return (
    <>
      <NavBar />
      <Controls active="insert" />
    </>
  )
}
