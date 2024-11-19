/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const DirectLogo = (props: Props) => {
  const params:any = useParams()
  const username = decodeURIComponent(params?.username[0])
  const router = useRouter()


  return (
  <div className='flex justify-center items-center py-4 relative'>
    <div className='flex justify-between items-center group'>
      {username == '@me' && <div className='w-[4px] h-[40px] absolute left-0 bg-white rounded-r-xl'></div>}
      <div className='hidden w-[4px] h-[25px] absolute left-0 bg-white rounded-r-xl group-hover:flex'></div>
      <div onClick={() => router.push(`/channels/@me`)} className='bg-[#5865F2] rounded-2xl size-[48px] flex justify-center items-center cursor-pointer'>
        <Image src={'/Logos/3_Icon_Clyde/RGB/icon_clyde_white_RGB.svg'} alt='Discord-Clone Logo' width={800} height={800} className='object-cover w-6'/>
      </div>
      <div></div>
    </div>
  </div>
  )
}

export default DirectLogo