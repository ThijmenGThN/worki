import { useEffect } from 'react'
import { useSession } from "next-auth/react"

import Statistics from '/source/components/Widgets/Statistics'
import Summary from '/source/components/Widgets/Summary'

import actions from '/source/actions'

export default function Overview() {
  const { data: session, status } = useSession()

  // Redirect if unauthorized.
  useEffect(() => actions.user.session.validate(status), [status])

  return (
    <div className="m-2 flex flex-col mt-20 min-h-[100vh]">
      <div className="border rounded-lg p-4 w-full bg-white mb-2 flex">
        <img src={session?.user.image} alt="Profile" className="rounded-full h-12" />
        <div className="mx-4">
          <p className="text-xl">{session?.user.name}</p>
          <p className="font-mono italic text-sm">{session?.user.email}</p>
        </div>
      </div>

      <Statistics />
      <Summary />
    </div>
  )
}
