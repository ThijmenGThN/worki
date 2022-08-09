import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"

import { FaTrash } from 'react-icons/fa'
import API from '/source/api'

export default function WidgetSummary() {
  const { data: session, status } = useSession()

  const [list, setList] = useState([])

  const fetchList = () => {
    API.user.shift.list(session?.user.email)
      .then(data => {
        setList(data)
      })
  }

  useEffect(() => fetchList(), [])

  return (
    <>
      <p className="m-2 font-bold text-xl">Summary</p>
      <ul className="border rounded-lg w-full bg-white grid grid-cols-2 gap-4 p-4">
        {
          list.map((shift, index) => (
            <li key={index} className="bg-neutral-100 pt-0 flex rounded">
              <div className="ml-2 grow grid grid-rows-2">
                <p>{`${new Date(shift.start).getDay()}/${new Date(shift.start).getMonth()}/${(new Date(shift.start).getFullYear() + '').slice(2)}`}</p>
                <p>{new Date(new Date(shift.end).getTime() - new Date(shift.start).getTime()).toISOString().slice(11, 19)}</p>
              </div>

              <button className="bg-red-400 hover:bg-red-500 rounded-r px-4 text-white"
                onClick={async () => {
                  await API.user.shift.delete(shift.id)
                  fetchList()
                }}
              >
                <FaTrash />
              </button>
            </li>
          ))
        }
      </ul>
    </>
  )
}
