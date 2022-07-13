import { BsFillCalendarWeekFill, BsFillGrid1X2Fill, BsFillGearFill, BsPlusLg, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import Link from 'next/Link'

export default function Control({active}) {
  return (
    <div className="fixed w-full bottom-0 overflow-hidden">
      <button className="bg-zinc-400 flex gap-2 mx-auto rounded-lg m-2 mt-0 p-4 pr-5 pt-3 text-white">
        <BsFillPlayFill className="text-xl mt-1" /> clock in new shift
      </button>

      <div className="flex justify-center h-[64px] bg-white border rounded-t-lg">
        <Link href="/app/overview">
          <button className={"hover:bg-zinc-300 px-8 border-r " + (active == 'overview' ? 'bg-zinc-200' : null)}>
            <BsFillGrid1X2Fill />
          </button>
        </Link>
        <Link href="/app/schedule">
          <button className={"hover:bg-zinc-300 px-8 border-r " + (active == 'schedule' ? 'bg-zinc-200' : null)}>
            <BsFillCalendarWeekFill />
          </button>
        </Link>
        <Link href="/app/insert">
          <button className={"hover:bg-zinc-300 px-8 border-r " + (active == 'insert' ? 'bg-zinc-200' : null)}>
            <BsPlusLg />
          </button>
        </Link>
        <Link href="/app/settings">
          <button className={"hover:bg-zinc-300 px-8 " + (active == 'settings' ? 'bg-zinc-200' : null)}>
            <BsFillGearFill />
          </button>
        </Link>
      </div>
    </div>
  )
}
