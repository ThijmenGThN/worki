import Link from 'next/Link'
import API from '/source/api'
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"

import { BsFillCalendarWeekFill, BsFillGrid1X2Fill, BsFillGearFill, BsPlusLg, BsFillPlayFill, BsFillStopFill } from 'react-icons/bs'

export default function InterfaceControl() {
  const { data: session, status } = useSession()
  
  const [active, setActive] = useState('overview')
  const [shift_isActive, setShift_isActive] = useState(false)
  const [shift_start, setShift_start] = useState()
  
  const shiftToggle = () => {
    API.user.shift.toggle(session?.user.email)
      .then(data => {
        setShift_isActive(data ? true : false)
        if (!data) return location.reload()
        setShift_start(new Date(data.start).getTime())
      })
  }

  useEffect(() => {
    API.user.shift.active(session?.user.email)
      .then(data => {
        setShift_isActive(data ? true : false)
        if (!data) return
        setShift_start(new Date(data.start).getTime())
      })
  }, [])

  const [shift_timeSince, setShift_timeSince] = useState()
  useEffect(() => {
    setShift_timeSince(Date.now() - shift_start)
    const intv = setInterval(() => setShift_timeSince(Date.now() - shift_start), 1000)
    return () => clearInterval(intv)
  }, [shift_start])

  useEffect(() => {
    const intv = setInterval(() => {
      const loc = window.location.pathname.split('/')[2]
      if (loc != active) setActive(loc)
    }, 100)

    return () => clearInterval(intv)
  }, [active])

  return (
    <div className="fixed w-full bottom-0 overflow-hidden">
      <button onClick={() => shiftToggle()} className={"flex gap-2 mx-auto w-52 justify-center rounded-lg m-2 mt-5 p-3 pr-5 pt-3 text-white "  + (shift_isActive ? 'bg-red-400' : 'bg-neutral-400')}>
        { 
          shift_isActive ? (
            <>
              <BsFillStopFill className="text-2xl" />
              end shift {new Date(shift_timeSince ? shift_timeSince : null).toISOString().slice(11, 19)}
            </>
          ) : (
            <>
              <BsFillPlayFill className="text-2xl" />
              start new shift
            </>
          )
        }
        <p className={"absolute w-36 h-8 ml-2 -z-10 top-7 rounded-lg " + (shift_isActive ? 'bg-red-400 animate-ping' : 'bg-neutral-400')}></p>
      </button>

      <div className="flex justify-center h-[100px] bg-white border rounded-t-lg">
        <Link href="/app/overview">
          <button className={"hover:bg-zinc-300 pb-10 px-8 border-r " + (active == 'overview' ? 'bg-zinc-200' : null)}>
            <BsFillGrid1X2Fill />
          </button>
        </Link>
        <Link href="/app/schedule">
          <button className={"hover:bg-zinc-300 pb-10 px-8 border-r " + (active == 'schedule' ? 'bg-zinc-200' : null)}>
            <BsFillCalendarWeekFill />
          </button>
        </Link>
        <Link href="/app/insert">
          <button className={"hover:bg-zinc-300 pb-10 px-8 border-r " + (active == 'insert' ? 'bg-zinc-200' : null)}>
            <BsPlusLg />
          </button>
        </Link>
        <Link href="/app/settings">
          <button className={"hover:bg-zinc-300 pb-10 px-8 " + (active == 'settings' ? 'bg-zinc-200' : null)}>
            <BsFillGearFill />
          </button>
        </Link>
      </div>
    </div>
  )
}
