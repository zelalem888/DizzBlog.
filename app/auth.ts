import { prisma } from "@/prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const oauthOption = {
// adapter : PrismaAdapter(prisma),
providers: [Google],
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter : PrismaAdapter(prisma),
  providers: [Google],
  session : {
    strategy:'jwt'
  }
  })