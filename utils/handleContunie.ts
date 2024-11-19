/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { redirect } from "next/navigation"
import prismadb from '@/lib/prismadb'
import { auth } from "@/auth";

type Props = {
  inviteCode:any;
}

export const handleContunie = async ({inviteCode}: Props) => {
  const origin = process.env.NEXT_PUBLIC_NEXTAUTH_URL as string
  const session = await auth()
  const userId = session?.user?.id

  if(!userId){
    return redirect('/login')
  }

  console.log()

  const server = await prismadb.server.update({
    where:{
      inviteCode: String(inviteCode)
    },
    data:{
      members:{
        create:[
          {
            profileId:String(userId)
          }
        ]
      }
    }
  })


  return redirect(`${origin}/channels/${server?.id}`)
  
}