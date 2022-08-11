import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"

import { BiArchive } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import { MdWork } from 'react-icons/md'
import API from '/source/api'

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function WidgetSummary() {
  const { data: session, status } = useSession()

  const [list, setList] = useState([])

  const fetchList = () => {
    API.user.shift.list(session.user.email)
      .then(data => {
        setList(data)
      })
  }

  useEffect(() => {
    if (status != 'authenticated') return

    fetchList()
    const intv = setInterval(() => fetchList(), 2000)
    return () => clearInterval(intv)
  }, [status])

  return (
    <>
      <p className="m-2 font-bold text-xl">Summary</p>
      <div className="border rounded-lg w-full bg-white">
        { list.length > 0 ?  
          (
            <ul className="grid grid-cols-2 gap-4 p-4">
              {
                list.map((shift, index) => (
                  <li key={index} className="bg-neutral-100 flex flex-col rounded p-4">
                    <div className="flex gap-2">
                      <MdWork className="h-full text-2xl" />
                      <p>
                        {
                          `${
                            new Date(shift.start).getDay()
                          } ${
                            months[new Date(shift.start).getMonth()]
                          } ${
                            new Date(shift.start).getFullYear()
                          }`
                        }
                      </p>
                    </div>

                    <div>
                      <p>{new Date(new Date(shift.end).getTime() - new Date(shift.start).getTime()).toISOString().slice(11, 19)}</p>
                    </div>

                    <button className="bg-red-400 hover:bg-red-500 text-white p-4 rounded-lg ml-auto"
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
          ) : (
            <p className="p-4 flex flex-col text-center font-mono italic">
              <BiArchive className="text-3xl w-full mb-2" />
              No shifts yet.
            </p>
          )
        }
      </div>
    </>
  )
}
