import { useSession, signIn, signOut } from "next-auth/react"
import { state } from 'react'

export default function index() {
  const { data: session, status } = useSession()

  return (
    <div className="text-center mt-5">
      <span className="mx-2">NextJS</span>
      <span className="bg-blue-500 rounded py-1 px-2 text-white">Tailwind</span>

      <p className="p-2 bg-zinc-200 my-5 max-w-[512px] mx-auto rounded">
        { status == "authenticated" ? (
          <span>You're logged in @{session.user.name}.</span>
        ) : (
          <span>Whoops, you're not logged in.</span>
        )}
      </p>

      <button className="p-2 rounded bg-blue-500 text-white mr-2" onClick={() => signIn()}>Log in</button>
      <button className="p-2 rounded border-blue-500 border text-blue-500" onClick={() => signOut()}>Log out</button>
    </div>
  )
}
