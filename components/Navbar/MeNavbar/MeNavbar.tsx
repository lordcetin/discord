/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import { useAudioCall } from '@/store/audioCall';
import { useVideoCall } from '@/store/videoCall';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react'

type Props = {
  otherMembers:any;
}

const MeNavbar = ({otherMembers}: Props) => {
  const params:any = useParams()
  const isConversation = decodeURIComponent(params?.username[0]) == '@me' && params?.username[1] === otherMembers?.profile?.id ? true : false
  const { isAudioCall, toggleAudioCall }:any = useAudioCall()
  const { isVideoCall, toggleVideoCall }:any = useVideoCall()
  return (
  <div className='h-[48px] w-full flex justify-between items-center border-b border-[#1F2124] self-start bg-[#313338] px-3 text-neutral-300 relative'>
    <div className='flex-1 flex items-center gap-x-4 min-w-0 overflow-hidden relative'>
      {isConversation ?
      <>
      <div className='flex items-center gap-x-2'>
        <Image src={otherMembers?.profile?.image} alt='' width={800} height={800} className='object-cover size-6'/>
        <h1 className='cursor-pointer'>{otherMembers?.profile?.username}</h1>
      </div>
      </>
      :
      <>
      <div className='flex items-center gap-x-2'>
        <svg className="linkButtonIcon_c91bad" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M13 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" className=""></path><path fill="currentColor" d="M3 5v-.75C3 3.56 3.56 3 4.25 3s1.24.56 1.33 1.25C6.12 8.65 9.46 12 13 12h1a8 8 0 0 1 8 8 2 2 0 0 1-2 2 .21.21 0 0 1-.2-.15 7.65 7.65 0 0 0-1.32-2.3c-.15-.2-.42-.06-.39.17l.25 2c.02.15-.1.28-.25.28H9a2 2 0 0 1-2-2v-2.22c0-1.57-.67-3.05-1.53-4.37A15.85 15.85 0 0 1 3 5Z" className=""></path></svg>
        <h1>Friends</h1>
      </div>

      <div className='w-[1px] h-[24px] bg-neutral-600'></div>

      <div className='flex justify-center items-center px-3 bg-[#43444B] rounded-sm text-white hover:bg-[#43444B]/80 transition-all cursor-default'>Online</div>
      <div className='flex justify-center items-center px-3 rounded-sm hover:bg-[#43444B]/80 transition-all cursor-pointer text-neutral-400 hover:text-white'>All</div>
      <div className='flex justify-center items-center px-3 rounded-sm hover:bg-[#43444B]/80 transition-all cursor-pointer text-neutral-400 hover:text-white'>Waiting</div>
      <div className='flex justify-center items-center px-3 rounded-sm hover:bg-[#43444B]/80 transition-all cursor-pointer text-neutral-400 hover:text-white'>Blocked</div>
      <div className='flex justify-center items-center px-3 rounded-sm bg-[#248045] transition-all cursor-pointer text-white'>Add Friend</div>
      </>
      }

    </div>

    {isConversation ?
    <div className='flex items-center gap-x-4 flex-grow-0 flex-shrink-0 basis-auto box-border absolute right-3 bg-[#313338]'>
      <svg onClick={toggleAudioCall} x="0" y="0" className={isAudioCall ? "icon_fc4f04 cursor-pointer text-white hover:text-neutral-400 transition-all" : "icon_fc4f04 cursor-pointer text-neutral-400 hover:text-white transition-all"} aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M2 7.4A5.4 5.4 0 0 1 7.4 2c.36 0 .7.22.83.55l1.93 4.64a1 1 0 0 1-.43 1.25L7 10a8.52 8.52 0 0 0 7 7l1.12-2.24a1 1 0 0 1 1.19-.51l5.06 1.56c.38.11.63.46.63.85C22 19.6 19.6 22 16.66 22h-.37C8.39 22 2 15.6 2 7.71V7.4ZM13 3a1 1 0 0 1 1-1 8 8 0 0 1 8 8 1 1 0 1 1-2 0 6 6 0 0 0-6-6 1 1 0 0 1-1-1Z" className=""></path><path fill="currentColor" d="M13 7a1 1 0 0 1 1-1 4 4 0 0 1 4 4 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 0 1-1-1Z" className=""></path></svg>
      <svg onClick={toggleVideoCall} x="0" y="0" className={isVideoCall ? "icon_fc4f04 cursor-pointer text-white hover:text-neutral-400 transition-all" : "icon_fc4f04 cursor-pointer text-neutral-400 hover:text-white transition-all"} aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M4 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-2.12a1 1 0 0 0 .55.9l3 1.5a1 1 0 0 0 1.45-.9V7.62a1 1 0 0 0-1.45-.9l-3 1.5a1 1 0 0 0-.55.9V7a3 3 0 0 0-3-3H4Z" className=""></path></svg>
      <svg x="0" y="0" className="icon_fc4f04 cursor-pointer text-neutral-400 hover:text-white transition-all" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M19.38 11.38a3 3 0 0 0 4.24 0l.03-.03a.5.5 0 0 0 0-.7L13.35.35a.5.5 0 0 0-.7 0l-.03.03a3 3 0 0 0 0 4.24L13 5l-2.92 2.92-3.65-.34a2 2 0 0 0-1.6.58l-.62.63a1 1 0 0 0 0 1.42l9.58 9.58a1 1 0 0 0 1.42 0l.63-.63a2 2 0 0 0 .58-1.6l-.34-3.64L19 11l.38.38ZM9.07 17.07a.5.5 0 0 1-.08.77l-5.15 3.43a.5.5 0 0 1-.63-.06l-.42-.42a.5.5 0 0 1-.06-.63L6.16 15a.5.5 0 0 1 .77-.08l2.14 2.14Z" className=""></path></svg>
      <svg x="0" y="0" className="icon_fc4f04 cursor-pointer text-neutral-400 hover:text-white transition-all" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 8a3 3 0 1 0-2.7-4.3c-.2.4.06.86.44 1.12a5 5 0 0 1 2.14 3.08c.01.06.06.1.12.1ZM16.62 13.17c-.22.29-.65.37-.92.14-.34-.3-.7-.57-1.09-.82-.52-.33-.7-1.05-.47-1.63.11-.27.2-.57.26-.87.11-.54.55-1 1.1-.92 1.6.2 3.04.92 4.15 1.98.3.27-.25.95-.65.95a3 3 0 0 0-2.38 1.17ZM15.19 15.61c.13.16.02.39-.19.39a3 3 0 0 0-1.52 5.59c.2.12.26.41.02.41h-8a.5.5 0 0 1-.5-.5v-2.1c0-.25-.31-.33-.42-.1-.32.67-.67 1.58-.88 2.54a.2.2 0 0 1-.2.16A1.5 1.5 0 0 1 2 20.5a7.5 7.5 0 0 1 13.19-4.89ZM9.5 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15.5 22Z" className=""></path><path fill="currentColor" d="M19 14a1 1 0 0 1 1 1v3h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3h-3a1 1 0 1 1 0-2h3v-3a1 1 0 0 1 1-1Z" className=""></path></svg>
      <svg x="0" y="0" className="icon_fc4f04 cursor-pointer text-neutral-400 hover:text-white transition-all" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M23 12.38c-.02.38-.45.58-.78.4a6.97 6.97 0 0 0-6.27-.08.54.54 0 0 1-.44 0 8.97 8.97 0 0 0-11.16 3.55c-.1.15-.1.35 0 .5.37.58.8 1.13 1.28 1.61.24.24.64.15.8-.15.19-.38.39-.73.58-1.02.14-.21.43-.1.4.15l-.19 1.96c-.02.19.07.37.23.47A8.96 8.96 0 0 0 12 21a.4.4 0 0 1 .38.27c.1.33.25.65.4.95.18.34-.02.76-.4.77L12 23a11 11 0 1 1 11-10.62ZM15.5 7.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" className=""></path><path fill="currentColor" d="M24 19a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" className=""></path></svg>
      <div className='w-[144px] h-[24px] flex items-center bg-[#1E1F22] rounded-sm px-2'>
        <input type="text" className='bg-transparent outline-none w-full placeholder:text-neutral-500 text-sm' placeholder='Search' />
        <svg className="icon_effbe2 visible_effbe2 cursor-pointer" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M15.62 17.03a9 9 0 1 1 1.41-1.41l4.68 4.67a1 1 0 0 1-1.42 1.42l-4.67-4.68ZM17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" clipRule="evenodd" className=""></path></svg>
      </div>
      <svg x="0" y="0" className="icon_fc4f04 cursor-pointer text-neutral-400 hover:text-white transition-all" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5ZM4 5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v6c0 .83-.67 1.5-1.5 1.5h-2.65c-.5 0-.85.5-.85 1a3 3 0 1 1-6 0c0-.5-.35-1-.85-1H5.5A1.5 1.5 0 0 1 4 11.5v-6Z" clipRule="evenodd" className=""></path></svg>
      <svg x="0" y="0" className="icon_fc4f04 cursor-pointer text-neutral-400 hover:text-white transition-all" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="transparent" className=""></circle><path fill="currentColor" fillRule="evenodd" d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm-.28-16c-.98 0-1.81.47-2.27 1.14A1 1 0 1 1 7.8 7.01 4.73 4.73 0 0 1 11.72 5c2.5 0 4.65 1.88 4.65 4.38 0 2.1-1.54 3.77-3.52 4.24l.14 1a1 1 0 0 1-1.98.27l-.28-2a1 1 0 0 1 .99-1.14c1.54 0 2.65-1.14 2.65-2.38 0-1.23-1.1-2.37-2.65-2.37ZM13 17.88a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0Z" clipRule="evenodd" className=""></path></svg>
    </div>
    :
    <div className='flex items-center gap-x-4 flex-grow-0 flex-shrink-0 basis-auto box-border absolute right-3 bg-[#313338] w-[170px] justify-center before:contents-[" "] before:bg-gradient-to-l before:to-transparent before:from-[#313338] before:w-[8px] before:h-[46px] before:absolute before:-left-2'>
      <svg x="0" y="0" className="icon_fc4f04 cursor-pointer text-neutral-400 hover:text-white transition-all" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M19 14a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3h-3a1 1 0 1 1 0-2h3v-3a1 1 0 0 1 1-1Z" fill="currentColor" className=""></path><path d="M20.76 12.57c.4.3 1.23.13 1.24-.37V12a10 10 0 1 0-18.44 5.36c.12.19.1.44-.04.61l-2.07 2.37A1 1 0 0 0 2.2 22h10c.5-.01.67-.84.37-1.24A3 3 0 0 1 15 16h.5a.5.5 0 0 0 .5-.5V15a3 3 0 0 1 4.76-2.43Z" fill="currentColor" className=""></path></svg>
      <div className='w-[1px] h-[24px] bg-neutral-600'></div>
      <svg x="0" y="0" className="icon_fc4f04 cursor-pointer text-neutral-400 hover:text-white transition-all" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5ZM4 5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v6c0 .83-.67 1.5-1.5 1.5h-2.65c-.5 0-.85.5-.85 1a3 3 0 1 1-6 0c0-.5-.35-1-.85-1H5.5A1.5 1.5 0 0 1 4 11.5v-6Z" clipRule="evenodd" className=""></path></svg>
      <svg x="0" y="0" className="icon_fc4f04 cursor-pointer text-neutral-400 hover:text-white transition-all" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="transparent" className=""></circle><path fill="currentColor" fillRule="evenodd" d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm-.28-16c-.98 0-1.81.47-2.27 1.14A1 1 0 1 1 7.8 7.01 4.73 4.73 0 0 1 11.72 5c2.5 0 4.65 1.88 4.65 4.38 0 2.1-1.54 3.77-3.52 4.24l.14 1a1 1 0 0 1-1.98.27l-.28-2a1 1 0 0 1 .99-1.14c1.54 0 2.65-1.14 2.65-2.38 0-1.23-1.1-2.37-2.65-2.37ZM13 17.88a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0Z" clipRule="evenodd" className=""></path></svg>
    </div>
    }
  </div> 
  )
}

export default MeNavbar