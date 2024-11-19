/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Member, Message,User } from '@prisma/client';
import React, { Fragment, useRef, ElementRef } from 'react'
import ChatWelcome from '../ChatWelcome/ChatWelcome';
import { useChatQuery } from '@/hook/useChatQuery';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { LuLoader, LuLoader2, LuServerCrash } from 'react-icons/lu';
import Image from 'next/image';
import ChatIem from './ChatIem';
import { format } from 'date-fns';
import { useChatSocket } from '@/hook/useChatSocket';
import { useChatScroll } from '@/hook/useChatScroll';

const DATE_FORMAT = 'd.MM.yyyy HH:mm';

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: User
  }
}

type Props = {
  name:string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

const ChannelChatMessages = ({name,member,chatId,apiUrl,socketQuery,socketUrl,paramKey,paramValue,type}: Props) => {
  const addKey = `chat:${chatId}`
  const queryKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`
  
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);
  
  const {data,fetchNextPage,hasNextPage,isFetchingNextPage,status}:any = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue
  })
  useChatSocket({queryKey,addKey,updateKey})
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  })

  if(status === "loading"){
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
        <AiOutlineLoading3Quarters size={28} className='animate-spin mb-2'/>
        <p className="text-xs text-neutral-400">Loading messages...</p>
      </div>
    )
  }

  if(status === "error"){
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
        <LuServerCrash size={28} className='mb-2'/>
        <p className="text-xs text-neutral-400">Something went wrong!</p>
      </div>
    )
  }

  return (
    <div ref={chatRef} className='w-full flex-col items-center h-[calc(100vh-48px)] p-3 overflow-y-auto pb-28'>
      {!hasNextPage && <div className='flex-1'/> }
      {!hasNextPage && <ChatWelcome type={type} name={name}/>}
      {hasNextPage && (
        <div className='flexx justify-center w-full items-center'>
          {isFetchingNextPage ? (
            <LuLoader2 className='animate-spin size-6 text-neutral-600 my-4 flex justify-center items-center w-full'/>
          ): (<button onClick={() => fetchNextPage()} className='text-neutral-400 hover:text-white transition-all flex justify-center items-center w-full my-4'>Load previous messages</button>)}
        </div>
      )}
      <div className='flex flex-col-reverse mt-auto gap-y-4'>
        {data?.pages?.map((group:any,i:any) => {
          return (
            <Fragment key={i}>
              {group?.items?.map((message:MessageWithMemberWithProfile) => {

                return (
                  <Fragment key={message?.id}>
                    <ChatIem
                    currentMember={member}
                    id={message?.id}
                    content={message?.content}
                    member={message?.member as any}
                    timestamp={format(new Date(message?.createdAt), DATE_FORMAT)}
                    isUpdated={message?.updatedAt !== message.createdAt}
                    fileUrl={message?.fileUrl}
                    deleted={message.deleted}
                    socketUrl={socketUrl}
                    socketQuery={socketQuery}
                    />
                  </Fragment>
                )
              })}
            </Fragment>
          )
        })}
      </div>
      <div ref={bottomRef}></div>
    </div>
  )
}

export default ChannelChatMessages