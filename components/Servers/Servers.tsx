/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import React, { Fragment } from 'react'
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from 'next/image';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { GoPlus } from "react-icons/go";
import { useInitialModal } from '@/store/initialModal';
import axios from 'axios';
type Props = {}

const Servers = (props: Props) => {
  const pathname:any = usePathname()
  const { toggleModal }:any = useInitialModal()

  const router = useRouter()

  const { isPending, error, data } = useQuery({
    queryKey: ['server'],
    queryFn: () =>
      fetch(`/api/server/getServer`).then((res) =>
        res.json(),
      ),
  })


  const handleClick = async (id:any) => {
    const {data:channel} = await axios.get(`/api/channel/firstChannel?serverId=${id}`)
    if(channel){
      redirect(`/channels/${id}/${channel?.id}`)
    }
  }

  return (
    <div className='flex-col flex items-center w-full gap-y-4'>
      <div className='w-[32px] h-[2px] bg-[#35363C] rounded-full'></div>
      {isPending &&
      <>
      <div className='rounded-full cursor-pointer size-12 bg-[#35363C] animate-pulse'></div>
      <div className='rounded-full cursor-pointer size-12 bg-[#35363C] animate-pulse'></div>
      <div className='rounded-full cursor-pointer size-12 bg-[#35363C] animate-pulse'></div>
      </>
      }
      {data?.map((item:any,index:any) => {
        return (
          <Fragment key={index}>
            <div onClick={() => handleClick(item?.id)} className='flex justify-between items-center group transition-all'>
              {pathname.startsWith(`/channels/${item?.id}`)  && <div className='w-[4px] h-[40px] absolute left-0 bg-white rounded-r-xl'></div>}
              <div className='hidden w-[4px] h-[25px] absolute left-0 bg-white rounded-r-xl group-hover:flex trans'></div>
              <div className='rounded-full transition-all duration-300 ease-out hover:rounded-2xl cursor-pointer size-12 overflow-hidden trans2'>
                <Image src={item?.image} alt='Server Image' width={800} height={800} className='object-cover size-12'/>
              </div>
              <div></div>
            </div>
          </Fragment>
        )
      })}
      <div onClick={toggleModal} className='bg-[#35363C] hover:bg-[#23A55A] hover:text-white hover:rounded-2xl transition-all duration-300 rounded-full size-[48px] flex justify-center items-center cursor-pointer text-[#23A55A] trans'><GoPlus size={28}/></div>
    </div>
  )
}

export default Servers