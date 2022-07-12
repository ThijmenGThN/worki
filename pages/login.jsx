import { getProviders, signIn, getSession } from "next-auth/react"
import { useState, useEffect } from "react"

export default function login() {
  const [providers, setProviders] = useState([])

  useEffect(() => {
    getProviders().then(res => setProviders(res))
  }, [])

  return (
    <>
      <ul className="mx-auto max-w-[512px] mt-10 p-2 pb-1 rounded bg-zinc-200">
        { Object.keys(providers)
          .map(key => (
            <li key={providers[key].id} onClick={() => signIn(providers[key].id)} className="hover:cursor-pointer mb-2 bg-zinc-300 rounded p-2">
              <p>{providers[key].name}</p>
            </li>
          ))
        }
      </ul>
    </>
  )
}

// -- IF LOGGED IN, REDIRECT HOME --
export async function getServerSideProps({req}) {
  if (await getSession({req})) {
    return {redirect: {destination: "/"}}
  } else return {props: {}}
}