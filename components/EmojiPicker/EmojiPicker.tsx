/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react'
import { FaSmile } from 'react-icons/fa'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

import {
Popover,
PopoverContent,
PopoverTrigger
} from '@/components/ui/popover' 
import { useTheme } from 'next-themes'

type Props = {
  onChange: (value:string) => void;
}

const EmojiPicker = ({onChange}: Props) => {
  const {resolvedTheme} = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <FaSmile size={24} className='text-[#B5BAC1] cursor-pointer hover:text-white transition-all'/>
      </PopoverTrigger>
      <PopoverContent side='right' sideOffset={40} className='bg-transparent border-none shadow-none drop-shadow-none mb-[68px]'>
        <Picker data={data} onEmojiSelect={(emoji:any) => onChange(emoji.native)} theme={resolvedTheme} />
      </PopoverContent>
    </Popover>
  )
}

export default EmojiPicker