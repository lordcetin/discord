/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { ServerWithMembersWithProfiles } from '@/types'
import { MemberRole } from '@prisma/client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { FaHeadphones } from 'react-icons/fa6'
import { HiMiniMicrophone } from 'react-icons/hi2'
import { IoMdSettings } from 'react-icons/io'
import SocketIndicator from '../SocketIndicator'

type Props = {

}

const ProfileBar = (props: Props) => {
  const {data:session}:any = useSession()

  return (
  <div className='w-[240px] bg-[#232428] absolute bottom-0 left-0 p-2 flex justify-between items-center'>
    <div className='hover:bg-[#313338] group transition-all py-1 rounded-sm flex items-center gap-x-3 px-3 cursor-pointer shrink-0'>
    {session && 
    <div className='flex items-center relative'>
      <div className='absolute -bottom-1 -right-1 border-4 group-hover:border-[#313338] border-[#232428] rounded-full'><SocketIndicator/></div>
      <Image src={session?.user?.image} alt='User Picture' width={800} height={800} className='object-cover size-7 rounded-full'/>
    </div>
    }
    <div className='flex-col items-center'>
      {session && <h1 className='font-bold text-sm'>{session?.user?.username}</h1>}
      <p className={`after:content-["Invisible"] after:block after:text-xs after:text-neutral-300 after:font-normal group-hover:after:hidden before:hidden before:content-["cloneth"] group-hover:before:block before:text-xs transition-all`}></p>
    </div>
    </div>
    <div className='flex items-center gap-x-3 pr-1'>
      <HiMiniMicrophone size={20} className='cursor-pointer'/>
      <FaHeadphones size={20} className='cursor-pointer'/>
      <IoMdSettings size={20} className='cursor-pointer'/>
    </div>
  </div>
  )
}

export default ProfileBar