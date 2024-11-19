/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useMembersModal } from '@/store/membersModal';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { Fragment } from 'react'

type Props = {
  server:any;
  user:any;
}

const Members = ({server,user}: Props) => {
  const { isMembersOpen }:any = useMembersModal()
  const router = useRouter()
  
  return (
    <>
    {isMembersOpen &&
    <div className='bg-[#2B2D31] text-neutral-400 h-screen flex-col px-2 py-5 w-[240px] overflow-x-hidden overflow-y-auto'>
      <h1 className='cursor-default text-neutral-500 pl-5'>Admin - {server?.members?.filter((u:any) => u?.role == 'ADMIN')?.length}</h1>
      <div className='flex-col items-center w-full gap-y-4 mt-2'>
      {server?.members?.filter((u:any) => u?.role == 'ADMIN').map((item:any,index:any) => {
        const profileId = item?.profileId
        return (
          <Fragment key={index}>
          {user?.filter((user:any) => user?.id == item?.profileId)?.map((member:any) => {
            return (
              <Fragment key={member?.id}>
                <div onClick={() => router.push(`/channels/@me/${profileId}`)} className='flex items-center p-3 hover:bg-[#35373C] group rounded-sm cursor-pointer gap-x-3'>
                  <div className='flex items-center relative'>
                    <div className='size-[10px] rounded-full bg-green-500 border border-[#2B2D31] group-hover:border-[#35373C] absolute bottom-0 right-0'></div>
                  <Image src={member?.image} alt='Profile Picture' width={800} height={800} className='object-cover size-[32px] rounded-full'/>
                  </div>
                  <h1 className='whitespace-nowrap overflow-hidden truncate'>{member?.displayName}</h1>
                </div>
              </Fragment>
            )
          })}
          </Fragment>
        )
      })}
      </div>
      {server?.members?.filter((u:any) => u?.role == 'MODERATOR')?.length > 0 &&
      <>
      <h1 className='cursor-default text-neutral-500 pl-5 mt-3'>Moderator - {server?.members?.filter((u:any) => u?.role == 'MODERATOR')?.length}</h1>
      <div className='flex-col items-center w-full gap-y-4 mt-2'>
      {server?.members?.filter((u:any) => u?.role == 'MODERATOR').map((item:any,index:any) => {
        const profileId = item?.profileId
        return (
          <Fragment key={index}>
          {user?.filter((user:any) => user?.id == item?.profileId)?.map((member:any) => {
            return (
              <Fragment key={member?.id}>
                <div onClick={() => router.push(`/channels/@me/${profileId}`)} className='flex items-center p-3 hover:bg-[#35373C] group rounded-sm cursor-pointer gap-x-3'>
                  <div className='flex items-center relative'>
                    <div className='size-[10px] rounded-full bg-green-500 border border-[#2B2D31] group-hover:border-[#35373C] absolute bottom-0 right-0'></div>
                  <Image src={member?.image} alt='Profile Picture' width={800} height={800} className='object-cover size-[32px] rounded-full'/>
                  </div>
                  <h1 className='whitespace-nowrap overflow-hidden truncate'>{member?.displayName}</h1>
                </div>
              </Fragment>
            )
          })}
          </Fragment>
        )
      })}
      </div>
      </>}
      <h1 className='cursor-default text-neutral-500 pl-5 mt-3'>Members - {server?.members?.length}</h1>
      <div className='flex-col items-center w-full gap-y-4 mt-2'>
      {server?.members?.filter((u:any) => u?.role !== 'MODERATOR' && u?.role !== 'ADMIN').map((item:any,index:any) => {
        
        const profileId = item?.profileId
        return (
          <Fragment key={index}>
          {user?.filter((user:any) => user?.id == item?.profileId)?.map((member:any) => {
            console.log("profileId",profileId)
            return (
              <Fragment key={member?.id}>
                <div onClick={() => router.push(`/channels/@me/${profileId}`)} className='flex items-center p-3 hover:bg-[#35373C] group rounded-sm cursor-pointer gap-x-3'>
                  <div className='flex items-center relative'>
                    <div className='size-[10px] rounded-full bg-green-500 border border-[#2B2D31] group-hover:border-[#35373C] absolute bottom-0 right-0'></div>
                  <Image src={member?.image} alt='Profile Picture' width={800} height={800} className='object-cover size-[32px] rounded-full'/>
                  </div>
                  <h1 className='whitespace-nowrap overflow-hidden truncate'>{member?.displayName}</h1>
                </div>
              </Fragment>
            )
          })}
          </Fragment>
        )
      })}
      </div>
    </div>
    }
    </>
  )
}

export default Members