/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import InviteModal from '@/modals/InviteModal/InviteModal';
import ServerModal from '@/modals/ServerModal/ServerModal';
import { useCreateChannel } from '@/store/createChannel';
import { useInviteModal } from '@/store/inviteModal';
import { ServerWithMembersWithProfiles } from '@/types';
import { MemberRole } from '@prisma/client';
import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import CreateChannelModal from '../CreateChannelModal/CreateChannelModal';
import { usePathname } from 'next/navigation';

type Props = {
  server:ServerWithMembersWithProfiles;
  role?:MemberRole;
}

const ServerHeader = ({server,role}: Props) => {
  const [openModal,setOpenModal] = useState(false)
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  const { isInviteOpen }:any = useInviteModal()
  const { isCreateChannelModalOpen }:any = useCreateChannel()
  const pathname = usePathname()
  const me = pathname?.startsWith('/channels/@me')

  return (
    <>
    {openModal &&
    <>
      <ServerModal setOpenModal={setOpenModal} isAdmin={isAdmin} isModerator={isModerator}/>
    </>
    }
    {isInviteOpen &&
    <>
      <InviteModal server={server} isModerator={isModerator}/>
    </>
    }
    {isCreateChannelModalOpen &&
    <>
      <CreateChannelModal/>
    </>
    }
    {me ?
    <div className='h-[48px] w-[240px] border-b border-[#1F2124] self-start flex items-center px-2 cursor-pointer transition-all'>
      <button className='bg-[#1E1F22] w-full rounded-sm text-left px-2 text-sm py-1 text-neutral-400'>Find or start a chat</button>
    </div>
    :<div onClick={() => setOpenModal(!openModal)} className='h-[48px] w-[240px] border-b border-[#1F2124] self-start flex justify-between items-center px-5 cursor-pointer hover:bg-[#35373C] transition-all'>
      <h1 className='font-semibold'>{server?.name}</h1>
      {openModal ? <IoCloseOutline size={19} className='ml-3'/> : <FaChevronDown size={13}/>}
    </div>
    }
    </>
  )
}

export default ServerHeader