import { getProviders, signIn, getSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { BsGoogle } from 'react-icons/bs'

export default function Index() {
  const [providers, setProviders] = useState([])

  useEffect(() => {
    getProviders().then(res => setProviders(res))
  }, [])

  return (
    <div className="bg-white flex h-screen flex-col">
      <div className="bg-yellow-500 w-full p-4 text-center">
        <p className="text-white font-bold text-2xl italic">worki</p>
        <p className="text-white font-mono italic">schedule and manage work shifts</p>
      </div>

      <ul className="p-4 mx-auto w-full max-w-[512px]">
        {
          Object.keys(providers).map(key => (<li key={providers[key].id} onClick={() => signIn(providers[key].id)}>
            <button className="border text-white bg-red-500 rounded w-full px-2 py-4 mb-2">
              <BsGoogle className="absolute text-lg mt-1 mx-3" /> Sign in with <span className="font-bold">{providers[key].name}</span>
            </button>
          </li>))
        }
      </ul>

      <div className="p-4 mb-8 absolute bottom-0 w-full flex justify-center gap-2">
        <a className="text-yellow-500" rel="noreferrer" href="mailto:worki-support@thijmenheuvelink.nl">Support</a>
        ✦
        <a className="text-yellow-500" rel="noreferrer" href="https://github.com/ThijmenGThN/worki" target="_blank">GitHub</a>
      </div>
    </div>
  )
}

// -- IF LOGGED IN, REDIRECT HOME --
export async function getServerSideProps({req}) {
  if (await getSession({req})) {
    return {redirect: {destination: "/app/overview"}}
  } else return {props: {}}
}