/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react'
import prismadb from '@/lib/prismadb'
import Sidebar from '@/components/Sidebar/Sidebar';
import SideNavbar from '@/components/SideNavbar/SideNavbar';
import RightBar from '@/components/RightBar/RightBar';
import ChannelNavbar from '@/components/Navbar/ChannelNavbar';
import Messages from '@/components/Messages/Messages';
import ChannelMessages from '@/components/Messages/ChannelMessages';
import { ChannelType } from '@prisma/client';
import { getOrCreateConversation } from '@/lib/conversation';


const layout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params:any
}>) => {

  const session:any = await auth()
  const userId:any = session?.user?.id

  const serverId:any = decodeURIComponent(params?.username[0])
  const otherUserId:any = await params?.username[1]

  // const server = await prismadb.server.findUnique({
  //   where:{
  //     id:serverId,
  //     members:{
  //       some:{
  //         profileId:userId
  //       }
  //     }
  //   }
  // });

  const server:any = await prismadb.server.findUnique({
    where:{
      id:serverId
    },
    include:{
      channels:{
        orderBy:{
          createdAt: "asc",
        }
      },
      members:{
        include:{
          profile:true
        },
        orderBy:{
          role: "asc"
        }
      }
    }
  });

  const currentMember:any = await prismadb.member.findFirst({
    where:{
      profileId:userId
    },
    include:{
      profile:true,
    },
  })

  const otherMember:any = await prismadb.member.findFirst({
    where:{
      profileId:otherUserId
    },
    include:{
      profile:true,
    },
  })

  const conversation = await getOrCreateConversation(currentMember?.id,otherMember?.id)

  const otherMembers = conversation ? conversation?.memberOne?.profileId === session?.user?.id ? conversation?.memberTwo : conversation?.memberOne : null

  const textChannels = server?.channels.filter((channel:any) => channel.type === ChannelType.TEXT)
  const audioChannels = server?.channels.filter((channel:any) => channel.type === ChannelType.AUDIO)
  const videoChannels = server?.channels.filter((channel:any) => channel.type === ChannelType.VIDEO)

  const members = server?.members.filter((member:any) => member.profileId !== userId)

  const role = server?.members.find((member:any) => member.profileId === userId)?.role;

  
  return (
    <div className='h-full flex'>
      <Sidebar/>
      <SideNavbar server={server} role={role}/>

      <main className='flex-col items-center w-full bg-[#313338]'>

        <ChannelNavbar server={server} serverId={serverId} otherMembers={otherMembers} />

        <div className='flex justify-between items-center w-full'>
          
          {serverId == '@me' 
          ? <Messages currentMember={currentMember} otherMember={otherMember} conversation={conversation}/> 
          : <ChannelMessages channels={server?.channels} currentMember={currentMember} otherMember={otherMember}/>}

          {serverId == '@me' ? null : <RightBar server={server} serverId={serverId}/>}

        </div>

      {children}
      
      </main>
      
    </div>
  )
  
}

export default layout