/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react'
import qs from 'query-string';
import { usePathname,useRouter,useSearchParams } from 'next/navigation';
import { LuVideo, LuVideoOff } from 'react-icons/lu';

type Props = {}

const ChatVideoButton = (props: Props) => {
  const searchParams = useSearchParams()
  const isVideo = searchParams?.get("video")
  const router = useRouter()
  const pathname = usePathname()
  const Icon = isVideo ? LuVideo : LuVideoOff

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: pathname || "",
      query:{
        video: isVideo ? undefined : true
      }
    }, {skipNull:true})
  }
  return (
    <button onClick={onClick}>
      <Icon className='size-6 text-neutral-400'/>
    </button>
  )
}

export default ChatVideoButton