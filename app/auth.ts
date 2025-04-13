import { prisma } from "@/prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// export const oauthOption = {
// adapter : PrismaAdapter(prisma),
// providers: [Google],
// secret: process.env.AUTH_SECRET,
// }

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter : PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session : {
    strategy:'jwt'
  }
  })