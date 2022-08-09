import { useEffect } from 'react'
import { useSession } from "next-auth/react"

import Statistics from '/source/components/Widgets/Statistics'
import Summary from '/source/components/Widgets/Summary'

export default function Overview() {
  const { data: session, status } = useSession()

  // Redirect if unauthorized.
  useEffect(() => { if (status == 'unauthenticated') window.location.replace('/') }, [status])

  return (
    <div className="m-2 flex flex-col mt-20">
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
