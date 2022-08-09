import { signOut } from "next-auth/react"
import { AiOutlineLogout } from 'react-icons/ai'

export default function InterfaceNavBar() {
  return (
    <div className="w-full flex text-white bg-yellow-500 fixed top-0">
      <p className="font-bold grow italic p-4 text-2xl">worki</p>

      <button className="bg-yellow-400 font-bold px-4 text-3xl hover:bg-yellow-600" onClick={() => signOut()}>
        <AiOutlineLogout />
      </button>
    </div>
  )
}
