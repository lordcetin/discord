/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { auth } from '@/auth';
import { MemberRole } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const session:any = await auth()
    const userId = session?.user?.id;
    const formData = await req.formData()
    const channelName:any = formData.get('channelName')
    const serverId:any = formData.get('serverId')
    const channelType:any = formData.get('channelType')
    const privateChannel:any = formData.get('privateChannel')
    console.log("formdata",formData)

    const server = await prismadb.server.update({
      where:{
        id: serverId,
        members:{
          some:{
            profileId:userId,
            role:{
              in: [MemberRole.ADMIN, MemberRole.MODERATOR]
            }
          }
        }
      },
      data:{
        channels:{
          create:{
            profileId:userId,
            name:channelName,
            type:channelType,
            private:privateChannel == 'off' ? false : true
          }
        }
      }
    })

    return NextResponse.json(server,{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}