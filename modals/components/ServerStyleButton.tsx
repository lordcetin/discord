/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import Image from 'next/image'
import React from 'react'
import { FaChevronRight } from 'react-icons/fa6';

type Props = {
  handleStep:any;
  image:any;
  title:any;
  styles:any;
}

const ServerStyleButton = ({handleStep,image,title,styles}: Props) => {

  return (
    <div onClick={handleStep} className={`${styles} flex justify-between w-full items-center px-5 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-200 transition-all cursor-pointer`}>
    <div className='flex items-center gap-x-2'>
      <Image src={image} alt='-' width={800} height={800} className='size-12'/>
      <h1 className='font-bold'>{title}</h1>
    </div>
    <FaChevronRight/>
    </div>
  )
}

export default ServerStyleButton