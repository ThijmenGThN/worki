import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"

import { BiArchive, BiTransfer } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import { MdWork } from 'react-icons/md'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import API from '/source/api'

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function WidgetSummary() {
  const { data: session, status } = useSession()
  
  const [list, setList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalAction, setModalAction] = useState()

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
      <div className="border rounded-lg w-full bg-white p-4 pb-2">
        { list.length > 0 ?  
          (
            <ul className="grid grid-cols-2 gap-2">
              {
                list.map((shift, index) => (
                  <li key={index} className="bg-gradient-to-tl from-neutral-200 to-neutral-100 flex flex-col rounded p-4">
                    <p className="text-center mb-2">
                      { new Date(shift.end).getDay() } { months[new Date(shift.end).getMonth()] } { new Date(shift.end).getFullYear() }
                    </p>

                    <div className="flex gap-2 mx-4">
                      <p>{ new Date(shift.start).getHours() }:{ new Date(shift.start).getMinutes() }</p>
                      <BiTransfer className="text-xl mt-1 grow" />
                      <p>{ new Date(shift.end).getHours() }:{ new Date(shift.end).getMinutes() }</p>
                    </div>

                    <button className="bg-neutral-400 hover:bg-red-500 text-white py-2 px-4 mt-4 rounded-lg flex"
                      onClick={async () => {
                        setShowModal(true)
                        setModalAction(shift.id)
                      }}
                    >
                      <p className="grow">
                        {
                          new Date(
                            new Date(shift.end).getTime() - new Date(shift.start).getTime()
                          )
                            .toISOString()
                            .slice(11, 19)
                        }
                      </p>
                      <FaTrash className="mt-1" />
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

        <p className="italic font-mono text-sm text-neutral-400 flex mt-2">
          <AiOutlineInfoCircle className="mt-[2px] mx-1" /> a list of recent shifts
        </p>
      </div>

      {
        showModal ? (
          <div className="z-10">
            <div className="bg-black opacity-60 w-full h-full absolute top-0 left-0"></div>
            <div className="bg-neutral-100 rounded-lg p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col text-center">
              <p className="mx-2 mb-2 font-bold">Approve Deletion</p>
              <p className="mx-2 mb-4 w-44">Are you sure you'd like to delete this shift?</p>

              <div className="flex gap-2 mx-auto">
                <button className="bg-red-500 hover:bg-red-600 rounded text-white py-2 px-4" onClick={async () => {await API.user.shift.delete(modalAction) ; fetchList() ; setShowModal(false)}}>Confirm</button>
                <button className="bg-neutral-400 hover:bg-neutral-500 rounded text-white py-2 px-4" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        ) : null
      }
    </>
  )
}
