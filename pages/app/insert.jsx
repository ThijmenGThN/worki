import { useEffect } from 'react'
import { useSession } from "next-auth/react"

export default function Insert() {
  const { data: session, status } = useSession()

  // Redirect if unauthorized.
  useEffect(() => { if (status == 'unauthenticated') window.location.replace('/') }, [status])

  return (
    <div className="m-2 flex flex-col mt-20">
      //
    </div>
  )
}
