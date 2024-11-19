/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { getOrCreateConversation } from '@/lib/conversation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Input from '../Chat/Input';
import ChannelChatMessages from '../ChannelChatMessages/ChannelChatMessages';
import { ChannelType } from '@prisma/client';
import MediaRoom from '../Media/MediaRoom';

type Props = {
  channels:any;
  member:any;
}

const ChannelInbox = ({channels,member}: Props) => {
  const {data:sesion}:any = useSession()
  const params:any = useParams()
  const channel = channels?.filter((u:any) => u.id == params?.username[1])?.[0]
  return (
    <div className='flex-col items-center w-full relative'>
      {channel?.type === ChannelType.TEXT && (
        <>
      <ChannelChatMessages
      member={member}
      name={channel?.name}
      chatId={channel?.id}
      type='channel'
      apiUrl='/api/messages'
      socketUrl='/api/socket/messages'
      socketQuery={{
        userId: sesion?.user?.id,
        channelId: channel?.id,
        serverId: channel?.serverId,
      }}
      paramKey='channelId'
      paramValue={channel?.id}
      />
      <Input
      name={channel?.name}
      type='channel'
      apiUrl='/api/socket/messages'
      query={{
        userId:sesion?.user?.id,
        channelId:channel?.id,
        serverId:channel?.serverId,
      }}
      />
      </>
      )}
      {channel.type === ChannelType.AUDIO && (
      <>
        <MediaRoom
        chatId={channel?.id}
        video={true}
        audio={true}
        />
      </>)}
      {channel.type === ChannelType.VIDEO && (
      <>
        <MediaRoom
        chatId={channel?.id}
        video={true}
        audio={true}
        />
      </>)}
    </div>
  )
}

export default ChannelInbox