/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import { auth } from '@/auth';
import React from 'react'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation';
import { useOrigin } from '@/hook/useOrigin';
import Image from 'next/image';
import Link from 'next/link';
import InviteComp from '@/components/InviteComp/InviteComp';

type Props = {
  params:any;
}

const InviteCode = async ({params}:Props) => {
  const inviteCode:any = params?.inviteCode
  const session = await auth()
  const userId = session?.user?.id
  const origin = process.env.NEXT_PUBLIC_NEXTAUTH_URL as string

  // if(!session){
  //   return redirect('/login')
  // }

  const existServer = await prismadb.server.findFirst({
    where:{
      inviteCode: inviteCode,
      // members:{
      //   some:{
      //     profileId:userId
      //   }
      // }
    },
    include:{
      channels:true
    }
  });



  // if(existServer){
  //   return redirect(`/channels/${existServer?.id}`)
  // }


  return (
    <InviteComp existServer={existServer}/>
  )
}

export default InviteCode