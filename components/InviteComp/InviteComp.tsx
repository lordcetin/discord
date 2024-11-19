/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useOrigin } from '@/hook/useOrigin'
import { handleContunie } from '@/utils/handleContunie'
import { handleSign } from '@/utils/handleSign'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

type Props = {
  existServer:any
}

const InviteComp = ({existServer}: Props) => {
  const origin = useOrigin()
  const [moderegister,setMode] = useState('')
  const params = useParams()
  const inviteCode:any = params?.inviteCode

  useEffect(() => {
    if(window){
      const mode = new URLSearchParams(window?.location?.search);
      const moderegister:any = mode.get('mode');
      setMode(moderegister)
    }
  }, []);


  const [displayName,setDisplayName] = useState('')
  const [loading,setLoading] = useState(false)

  const handleDisplayName = async (name:any) => {
    if(!name){
      return redirect('/login')
    }else{
      setLoading(true)
     const result = await handleSign(name,inviteCode)
     await signIn("credentials",{
      email:result?.email,
      password:result?.pass,
      callbackUrl:`${origin}/channels/${existServer?.id}/${existServer?.channels[0]?.id}`
     })
     setLoading(false)
    }
  }

  return (
  <div className="flex justify-center items-center w-screen h-screen bg-[url('/loginBG.svg')] bg-no-repeat bg-cover">
    <div className="fixed top-12 left-12 "><Image src={'/Logos/1_Full Logo Lockup/RGB/full_logo_white_RGB.svg'} width={800} height={800} alt="discord-clone logo" className="w-full h-6 object-cover"/></div>
    {moderegister == 'register' ? 
    <div className='w-[480px] bg-[#313338] flex-col flex items-center p-[32px] rounded-sm'>
      <Image src={'/Illustrators/e04bcb7316f7205e85fb.svg'} alt='Gate Locked' width={800} height={800} className='w-[252px] object-cover mb-[20px]' />
      <h1 className='text-xl font-[600] text-white mb-[8px]'>Registration failed</h1>
      <p className='text-md text-neutral-400 font-[400] px-5 mb-[24px]'>You must be at least 13 years old to use Discord. Check out our help <span className='text-blue-400 cursor-pointer hover:underline transition-all'>article to learn more</span>.</p>
      <div className='px-5 flex justify-center items-center w-full'><Link href={'/login'} className='bg-[#5865F2] w-full flex justify-center items-center py-2 text-white rounded-sm hover:bg-[#4752C4] transition-all'>Return to Login</Link></div>
    </div>
    :<div className='w-[480px] bg-[#313338] flex-col flex items-center p-[32px] rounded-sm'>
      {existServer ?
      <Image src={existServer?.image as string} alt='Server Image' width={800} height={800} className='size-16 object-cover rounded-2xl'/>
      : <div className='size-16 object-cover rounded-2xl bg-[#43464d] animate-pulse'></div>
      }
      <div className='text-white text-2xl font-bold mt-[8px]'>{existServer?.name}</div>
      <div className='flex items-center gap-x-4'>
        <div className='flex items-center gap-x-2 text-neutral-400'><span className='size-[10px] rounded-full bg-[#23A55A]'></span> 52 Online</div>
        <div className='flex items-center gap-x-2 text-neutral-400'><span className='size-[10px] rounded-full bg-[#B5BAC1]'></span> 846 Member</div>
      </div>
      <div className='mt-[40px] flex-col items-center w-full'>
        <h1 className='text-xs text-neutral-400 font-bold uppercase mb-[8px]'>Display Name</h1>
        <input type='text' onChange={(e:any) => setDisplayName(e.target.value)} className='bg-[#1E1F22] w-full py-2 px-3 rounded-sm outline-none text-white placeholder:text-neutral-500' placeholder='How should everyone address you?'/>
        <p className='text-xs text-neutral-400 mt-2'>This is how others see you. You can add special characters and emojis.</p>
        <button type='button' onClick={() => handleDisplayName(displayName)} className='bg-[#5865F2] rounded-sm w-full py-2 text-white mt-[22px] hover:bg-[#4752C4] transition-all flex justify-center items-center'>{loading ? <AiOutlineLoading3Quarters className='animate-spin'/> : "Contunie"}</button>
        <p className='text-xs text-neutral-400 mt-1'>By signing up you agree to Discord's <span className='text-[#069BE3] cursor-pointer hover:underline'>Terms of Service</span> and <span className='text-[#069BE3] cursor-pointer hover:underline'>Privacy Policy.</span></p>
        <button type='button' onClick={() => handleContunie({inviteCode})} className='text-[#069BE3] text-sm cursor-pointer hover:underline mt-6 flex items-center w-full'>Do you already have an account?</button>
      </div>
    </div>}
  </div>
  )
}

export default InviteComp