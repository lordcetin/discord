/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react'
import { LuHash } from 'react-icons/lu';

type Props = {
  type:"channel" | "conversation";
  name:any;
}

const ChatWelcome = ({type,name}: Props) => {
  return (
    <div className='space-y-2 px-4 mb-4'>
      {type === 'channel' && (
        <div className='size-[75px] rounded-full bg-[#383A40] flex items-center justify-center'>
          <LuHash size={28}/>
        </div>
      )}
      <p className='text-5xl font-bold text-white'>
        {type === 'channel' ? "Welcome to #" : ""}{name}
      </p>
      <p className='text-neutral-400'>
        {type === 'channel'
        ? `This is the start of the #${name} channel`
        : `This is the start of your conversation with ${name}`
        }
      </p>
    </div>
  )
}

export default ChatWelcome