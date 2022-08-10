import { useEffect } from 'react'
import { useSession } from "next-auth/react"

import actions from '/source/actions'

export default function Insert() {
  const { data: session, status } = useSession()

  // Redirect if unauthorized.
  useEffect(() => actions.user.session.validate(status), [status])

  return (
    <div className="m-2 flex flex-col mt-20 min-h-[100vh]">
      WIP - Insert custom shifts.
    </div>
  )
}
