/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import NextAuth from "next-auth"
import credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@auth/prisma-adapter";
import { saltAndHashPassword } from "@/lib/solvePass";
import prismadb from '@/lib/prismadb'
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
          email:{
              label: 'Email',
              type: 'text',
          },
          password: {
              label: 'Password',
              type: 'password'
          }
      },
      //@ts-ignore
      async authorize(credentials:any){

          if(!credentials?.email || !credentials?.password){
            throw new Error('Email and password required');
          }

          const user = await prismadb.user.findUnique({
            where:{
              email: credentials.email,
            }
          });

          if(!user || !user.hashedPassword) {
            throw new Error('Email does not exist');
          }

          const isCorrectPassword = await saltAndHashPassword(credentials.password,user.hashedPassword)
          
          if(!isCorrectPassword){
            throw new Error('Incorrect password')
          }

          return user;
      }
  }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId:process.env.GOOGLE_ID as string,
      clientSecret:process.env.GOOGLE_SECRET as string
    })
  ],
  pages: {
    newUser:`/invite/[inviteCode]`,
    signIn: `/login`,
    error: '/login/error',
  },
  callbacks: {
    async redirect({ url, baseUrl }:{url:any,baseUrl:any}) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    jwt({ token, user }:{token:any,user:any}) {
      if (user) { // User is available during sign-in
        token.id = user.id
        token.username = user.username
        token.displayName = user.displayName
      }
      return token
    },
    session({ session, token }:{session:any,token:any}) {
      session.user.id = token.id
      session.user.username = token.username
      session.user.displayName = token.displayName
      return session
    },
  },
  debug: process.env.NODE_ENV == 'development',
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: 'jwt',
  },
  jwt:{
    secret: process.env.NEXTAUTH_JWT_SECRET || "UL^BUxub$o#cs9t3340%ru8XH8gh9%BxATgWFwfSK!fOLFki#n",
  }as any,
    secret: process.env.NEXTAUTH_SECRET || "ZCqP6tmtAkWksRQFMXRG8dPABmEYNiczkGx/GyQK+z8=",
})