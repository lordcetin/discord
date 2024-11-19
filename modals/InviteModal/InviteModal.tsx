/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import { useOrigin } from '@/hook/useOrigin'
import { useInviteModal } from '@/store/inviteModal'
import { ServerWithMembersWithProfiles } from '@/types'
import { MemberRole } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IoIosSearch } from "react-icons/io";

type Props = {
  server:ServerWithMembersWithProfiles;
  isModerator:any
}

const InviteModal = ({server,isModerator}: Props) => {
  const {data:session}:any = useSession()
  const { toggleInviteModal }:any = useInviteModal()
  const [copied,setCopied] = useState(false)
  const origin = useOrigin();
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000);
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-[9999] flex justify-center items-center'>
      <div className='flex-col items-center w-[440px] pt-5 rounded-sm bg-[#313338] relative'>
        <AiOutlineClose onClick={toggleInviteModal} className='absolute top-3 right-3 text-neutral-400 hover:text-neutral-500 cursor-pointer'/>
        <h1 className='text-md font-semibold px-5'>Invite your friends to <strong>{session?.user?.username}</strong> server</h1>
        <div className='flex items-center w-full gap-x-2 text-neutral-400 px-5'>
          <svg className="channelIcon_cedfaf" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M16 4h.5v-.5a2.5 2.5 0 0 1 5 0V4h.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm4-.5V4h-2v-.5a1 1 0 1 1 2 0Z" clipRule="evenodd" className=""></path><path fill="currentColor" d="M12.5 8c.28 0 .5.22.5.5V9c0 .1 0 .2.02.31.03.34-.21.69-.56.69H9.85l-.67 4h4.97l.28-1.68c.06-.34.44-.52.77-.43a3 3 0 0 0 .8.11c.27 0 .47.24.43.5l-.25 1.5H20a1 1 0 1 1 0 2h-4.15l-.86 5.16a1 1 0 0 1-1.98-.32l.8-4.84H8.86l-.86 5.16A1 1 0 0 1 6 20.84L6.82 16H3a1 1 0 1 1 0-2h4.15l.67-4H4a1 1 0 1 1 0-2h4.15l.86-5.16a1 1 0 1 1 1.98.32L10.19 8h2.31Z" className=""></path></svg>
          <h1>Channel Name</h1>
        </div>
        <div className='flex-col items-center w-full mt-2 px-5'>
          <div className='flex items-center w-full relative'>
            <input type='text' className='bg-[#1E1F22] rounded placeholder:text-neutral-500 px-3 py-1 w-full outline-none' placeholder='Search friends'/>
            <IoIosSearch className='absolute right-3 size-5 text-neutral-500'/>
          </div>
          <div className='mt-2 flex items-center gap-x-2'>
            <svg className="warningIcon_cedfaf text-yellow-400" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="12" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="transparent" className=""></circle><path fill="currentColor" fillRule="evenodd" d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm1.44-15.94L13.06 14a1.06 1.06 0 0 1-2.12 0l-.38-6.94a1 1 0 0 1 1-1.06h.88a1 1 0 0 1 1 1.06Zm-.19 10.69a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z" clipRule="evenodd" className=""></path></svg>
            <h1 className='text-neutral-400 text-[11px]'>This channel is private. Only selected members and roles can view this channel.</h1>
          </div>
        </div>
        <div className='flex items-center w-full h-[1px] bg-black/50 mt-5'></div>

        {/* <div className='w-full h-[200px] overflow-x-hidden overflow-y-scroll'></div> */}

        <div className='bg-[#27292c] p-5 flex-col items-center w-full'>
          <h1>Or send a server invite link to a friend</h1>
          <div className='bg-[#1E1F22] w-full flex items-center rounded-sm my-2 box-border p-1'>
            <div className='bg-transparent w-full py-1 px-3 outline-none truncate'>{`${inviteUrl.slice(0,30)}`}</div>
            <button type='button' onClick={() => onCopy()} className={copied ? 'bg-[#1A6334] transition-all rounded-sm px-3 py-1' : 'bg-[#4752C4] hover:bg-[#3d46aa] transition-all rounded-sm px-3 py-1'}>Copy...</button>
          </div>
          <h1 className='text-xs text-neutral-400'>Your invite link will never expire. <span className='text-blue-400 cursor-pointer hover:underline transition-all'>Edit invite link.</span></h1>
        </div>
      </div>
    </div>
  )
}

export default InviteModal