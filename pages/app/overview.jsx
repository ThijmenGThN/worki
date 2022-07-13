import { useEffect } from 'react'
import { useSession } from "next-auth/react"

import NavBar from '/source/components/NavBar'
import Controls from '/source/components/Controls'
import Chart from '/source/components/Chart'

export default function Overview() {
  const { data: session, status } = useSession()

  // Redirect if unauthorized.
  // useEffect(() => { if (status == 'unauthenticated') window.location.replace('/') }, [status])

  return (
    <>
      <NavBar />

      <div className="m-2 flex flex-col mt-20">
        <p className="font-bold text-xl m-2 mb-4">Hi, {session?.user.name.split(' ')[0]}</p>

        <div className="border rounded-lg p-4 w-full bg-white">
          <Chart
            labels={['9:00', '10:00', '11:00', '12:00', '13:00']} 
            data={[[6, 8, 6, 6, 0]]}
          />
        </div>
      </div>

      <Controls active="overview" />
    </>
  )
}
