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
        <div className="border rounded-lg p-4 w-full bg-white mb-2 flex">
          <img src={session?.user.image} alt="Profile" className="rounded-full h-12" />
          <div className="mx-4">
            <p className="text-xl">{session?.user.name}</p>
            <p className="font-mono italic text-sm">{session?.user.email}</p>
          </div>
        </div>

        <p className="m-2 font-bold text-xl">Statistics</p>
        <div className="border rounded-lg p-4 w-full bg-white">
          <div className="bg-neutral-100 w-full h-20 rounded p-2 pb-7 text-center">
            <Chart
              labels={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']} 
              data={[[3,0,0,3,9,0,0]]}
            />

            <div className="grid grid-cols-7 -mt-8 mb-2 italic font-mono text-yellow-900">
              <p className="z-10">3</p>
              <p className="z-10">0</p>
              <p className="z-10">0</p>
              <p className="z-10">3</p>
              <p className="z-10">9</p>
              <p className="z-10">0</p>
              <p className="z-10">0</p>
            </div>

            <div className="grid grid-cols-7 text-yellow-900">
              <p>mon</p>
              <p>tue</p>
              <p>wed</p>
              <p>thu</p>
              <p>fri</p>
              <p>sat</p>
              <p>sun</p>
            </div>
          </div>
        </div>
      </div>

      <Controls active="overview" />
    </>
  )
}
