/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react'
import prismadb from '@/lib/prismadb'
import ChannelSideNavbar from './ChannelSideNavbar/ChannelSideNavbar'
import MeNavbar from './MeNavbar/MeNavbar'
import { useParams } from 'next/navigation'

type Props = {
  serverId:any;
  server:any;
  otherMembers:any;
}

const ChannelNavbar = ({serverId,server,otherMembers}: Props) => {
  const params:any = useParams()
  const isConversation = decodeURIComponent(params?.username[0]) == '@me' && params?.username[1] === otherMembers?.profile?.id ? true : false
  
  return (
    <>
  {isConversation ?
  <MeNavbar otherMembers={otherMembers}/>
  :
  <ChannelSideNavbar channels={server?.channels}/>
  }
  </>
  )
}

export default ChannelNavbar