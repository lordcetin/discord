/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react'
import ChannelChatMessages from '../ChannelChatMessages/ChannelChatMessages';
import Input from '../Chat/Input';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useAudioCall } from '@/store/audioCall';
import { useVideoCall } from '@/store/videoCall';
import MediaRoom from '../Media/MediaRoom';
type Props = {
  currentMember:any;
  otherMember:any;
  conversation:any;
}

const Messages = ({currentMember,otherMember,conversation}: Props) => {
  const {data:session} = useSession()
  const params = useParams()
  const { isAudioCall ,toggleAudioCall }:any = useAudioCall()
  const { isVideoCall, toggleVideoCall }:any = useVideoCall()

  return (
    <div className='w-full flex-col'>
      {!params?.username[1] ?
      <div className='flex-col flex justify-center items-center w-full px-8 mt-7'>
        <div className='bg-[#1E1F22] w-full flex items-center pr-3 rounded-md'>
          <input type='text' className='bg-transparent outline-none w-full px-2 placeholder:text-neutral-400 py-2' placeholder='Search'/>
          <svg className="icon_c18ec9 visible_c18ec9 text-neutral-400" aria-label="Search" aria-hidden="false" role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M15.62 17.03a9 9 0 1 1 1.41-1.41l4.68 4.67a1 1 0 0 1-1.42 1.42l-4.67-4.68ZM17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" clipRule="evenodd" className=""></path></svg>
        </div>
        <div className='flex-col items-center w-full mt-5'>
          <h1 className='text-sm text-neutral-400'>ONLINE</h1>
          <div className='w-full h-[1px] bg-neutral-600 flex items-center mt-3'></div>
        </div>
      </div>
      :  
      <div className='flex-col items-center w-full relative'>
        {isAudioCall || isVideoCall ?
        <MediaRoom
        chatId={conversation?.id}
        audio={true}
        video={isAudioCall ? false : true}
        />
        :
        <>
        <ChannelChatMessages 
        member={currentMember} 
        name={otherMember?.profile?.username}
        chatId={conversation?.id}
        type="conversation"
        apiUrl="/api/directmessages"
        paramKey="conversationId"
        paramValue={conversation?.id}
        socketUrl="/api/socket/directmessages"
        socketQuery={{
          userId:session?.user?.id as string,
          conversationId:conversation?.id as string
        }}
        />
        <Input
        name={otherMember?.profile?.username}
        type="conversation"
        apiUrl="/api/socket/directmessages"
        query={{
          userId:session?.user?.id as string,
          conversationId:conversation?.id as string
        }}
        />
        </>
        }
      </div>}
    </div>
  )
}

export default Messages