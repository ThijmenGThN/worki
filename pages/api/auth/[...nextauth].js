import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_PROVIDER_GOOGLE_CLIENTID,
      clientSecret: process.env.NEXTAUTH_PROVIDER_GOOGLE_SECRET,
    })
  ],
  callbacks: {
    async session({session}) {
      
      // run when user signs in.

      return session
    }
  },
  pages: {
    signIn: "/login",
  }
})