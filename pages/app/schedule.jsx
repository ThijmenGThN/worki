import { useEffect } from 'react'
import { useSession } from "next-auth/react"

import actions from '/source/actions'

export default function Schedule() {
  const { data: session, status } = useSession()

  // Redirect if unauthorized.
  useEffect(() => actions.user.session.validate(status), [status])

  return (
    <div className="m-2 flex flex-col mt-20 min-h-[100vh]">
      // WIP - View your schedule.
    </div>
  )
}
