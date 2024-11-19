/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import React, { useEffect, useState } from 'react'
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import "@livekit/components-styles";
import { Channel } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { LuLoader2 } from 'react-icons/lu';

type Props = {
  chatId:string;
  video:any;
  audio:any;
}

const MediaRoom = ({chatId,video,audio}: Props) => {
  const {data:session}:any = useSession()
  const [ token, setToken ] = useState("")

  useEffect(() => {
    const name = `${session?.user?.username}`;

    (async () => {
      try {
        const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
        const data = await resp.json()
        setToken(data?.token)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [session,chatId]);

  if(token === ''){
    return (
      <div className='flex flex-col flex-1 justify-center items-center w-full'>
        <LuLoader2 className='size-7 animate-spin text-neutral-400 my-4'/>
        <p className='text-xs text-neutral-400'>Loading...</p>
      </div>
    )
  }

  return (
    <div className='flex-col flex justify-center items-center w-full h-[95vh]'>
    <LiveKitRoom
    data-lk-theme="default"
    serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
    token={token}
    connect={true}
    video={video}
    audio={audio}
    >
      <VideoConference/>
    </LiveKitRoom>
    </div>
  )
}

export default MediaRoom