/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import React from 'react'
import prismadb from '@/lib/prismadb'
import ChannelInbox from '../ChannelInbox/ChannelInbox';
import { isEmpty } from 'lodash';
import { getOrCreateConversation } from '@/lib/conversation';

type Props = {
  currentMember:any;
  otherMember:any;
  channels:any;
}

const ChannelMessages = async ({currentMember,otherMember,channels}: Props) => {

  
  return (
    <div className='w-full flex-col'>
      <ChannelInbox channels={channels} member={currentMember}/>
    </div>
  )
}

export default ChannelMessages