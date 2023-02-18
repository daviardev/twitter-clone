import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENTKEY,
      clientSecret: process.env.NEXT_PUBLIC_SECRETKEY
    })
    // ...add more providers here
  ],
  callbacks: {
    async session ({ session, token }) {
      session.user.tag = session.user.name
        .split(' ')
        .join('')
        .toLocaleLowerCase()

      session.user.uid = token.sub
      return session
    }
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET
}

export default NextAuth(authOptions)
