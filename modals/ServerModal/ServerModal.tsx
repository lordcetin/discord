/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useCreateChannel } from '@/store/createChannel';
import { useInviteModal } from '@/store/inviteModal';
import React from 'react'

type Props = {
  isAdmin:any;
  isModerator:any;
  setOpenModal:any;
}

const ServerModal = ({isAdmin,isModerator,setOpenModal}: Props) => {

  const { toggleInviteModal }:any = useInviteModal()
  const { toggleCreateChannelModal }:any = useCreateChannel()
  

  return (
    <div className='absolute top-14 left-0 flex justify-center items-center w-full px-5'>
      <div className='bg-[#111214] flex-col flex items-center w-full p-2 rounded-sm space-y-2'>
        
        <div className='hover:bg-[#5865F2] p-1 hover:text-white transition-all flex items-center w-full px-2 rounded cursor-pointer text-neutral-400 text-sm justify-between'>
          <h1>Server Boost</h1>
          <svg className="icon_d90b3d" aria-hidden="true" role="img" width="15" height="15" viewBox="0 0 8 12"><path d="M4 0L0 4V8L4 12L8 8V4L4 0ZM7 7.59L4 10.59L1 7.59V4.41L4 1.41L7 4.41V7.59Z" fill="currentColor"></path><path d="M2 4.83V7.17L4 9.17L6 7.17V4.83L4 2.83L2 4.83Z" fill="currentColor"></path></svg>
        </div>
        
        <div className='w-full flex items-center bg-[#2E2F34] h-[1px]'></div>
        
        <div onClick={() => {toggleInviteModal(),setOpenModal(false)}} className='hover:bg-[#5865F2] p-1 hover:text-white transition-all flex items-center w-full px-2 rounded cursor-pointer text-[#949CF7] text-sm justify-between'>
          <h1>Invite People</h1>
          <svg className="icon_d90b3d" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 8a3 3 0 1 0-2.7-4.3c-.2.4.06.86.44 1.12a5 5 0 0 1 2.14 3.08c.01.06.06.1.12.1ZM16.62 13.17c-.22.29-.65.37-.92.14-.34-.3-.7-.57-1.09-.82-.52-.33-.7-1.05-.47-1.63.11-.27.2-.57.26-.87.11-.54.55-1 1.1-.92 1.6.2 3.04.92 4.15 1.98.3.27-.25.95-.65.95a3 3 0 0 0-2.38 1.17ZM15.19 15.61c.13.16.02.39-.19.39a3 3 0 0 0-1.52 5.59c.2.12.26.41.02.41h-8a.5.5 0 0 1-.5-.5v-2.1c0-.25-.31-.33-.42-.1-.32.67-.67 1.58-.88 2.54a.2.2 0 0 1-.2.16A1.5 1.5 0 0 1 2 20.5a7.5 7.5 0 0 1 13.19-4.89ZM9.5 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15.5 22Z" className=""></path><path fill="currentColor" d="M19 14a1 1 0 0 1 1 1v3h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3h-3a1 1 0 1 1 0-2h3v-3a1 1 0 0 1 1-1Z" className=""></path></svg>
        </div>

        {isAdmin && <div className='hover:bg-[#5865F2] p-1 hover:text-white transition-all flex items-center w-full px-2 rounded cursor-pointer text-neutral-400 text-sm justify-between'>
          <h1>Server Settings</h1>
          <svg className="icon_d90b3d" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M10.56 1.1c-.46.05-.7.53-.64.98.18 1.16-.19 2.2-.98 2.53-.8.33-1.79-.15-2.49-1.1-.27-.36-.78-.52-1.14-.24-.77.59-1.45 1.27-2.04 2.04-.28.36-.12.87.24 1.14.96.7 1.43 1.7 1.1 2.49-.33.8-1.37 1.16-2.53.98-.45-.07-.93.18-.99.64a11.1 11.1 0 0 0 0 2.88c.06.46.54.7.99.64 1.16-.18 2.2.19 2.53.98.33.8-.14 1.79-1.1 2.49-.36.27-.52.78-.24 1.14.59.77 1.27 1.45 2.04 2.04.36.28.87.12 1.14-.24.7-.95 1.7-1.43 2.49-1.1.8.33 1.16 1.37.98 2.53-.07.45.18.93.64.99a11.1 11.1 0 0 0 2.88 0c.46-.06.7-.54.64-.99-.18-1.16.19-2.2.98-2.53.8-.33 1.79.14 2.49 1.1.27.36.78.52 1.14.24.77-.59 1.45-1.27 2.04-2.04.28-.36.12-.87-.24-1.14-.96-.7-1.43-1.7-1.1-2.49.33-.8 1.37-1.16 2.53-.98.45.07.93-.18.99-.64a11.1 11.1 0 0 0 0-2.88c-.06-.46-.54-.7-.99-.64-1.16.18-2.2-.19-2.53-.98-.33-.8.14-1.79 1.1-2.49.36-.27.52-.78.24-1.14a11.07 11.07 0 0 0-2.04-2.04c-.36-.28-.87-.12-1.14.24-.7.96-1.7 1.43-2.49 1.1-.8-.33-1.16-1.37-.98-2.53.07-.45-.18-.93-.64-.99a11.1 11.1 0 0 0-2.88 0ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" className=""></path></svg>
        </div>}

        {isModerator && <div onClick={() => {toggleCreateChannelModal(),setOpenModal(false)}} className='hover:bg-[#5865F2] p-1 hover:text-white transition-all flex items-center w-full px-2 rounded cursor-pointer text-neutral-400 text-sm justify-between'>
          <h1>Create Channel</h1>
          <svg className="icon_d90b3d" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="transparent" className=""></circle><path fill="currentColor" fillRule="evenodd" d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm0-17a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H7a1 1 0 1 1 0-2h4V7a1 1 0 0 1 1-1Z" clipRule="evenodd" className=""></path></svg>
        </div>}

        {isModerator && <div className='hover:bg-[#5865F2] p-1 hover:text-white transition-all flex items-center w-full px-2 rounded cursor-pointer text-neutral-400 text-sm justify-between'>
          <h1>Create Category</h1>
          <svg className="icon_d90b3d" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3h-7l-1.4-2.1A2 2 0 0 0 8.92 2H5Zm7 7a1 1 0 0 1 1 1v3h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3H8a1 1 0 1 1 0-2h3v-3a1 1 0 0 1 1-1Z" clipRule="evenodd" className=""></path></svg>
        </div>}

        {isModerator && <div className='hover:bg-[#5865F2] p-1 hover:text-white transition-all flex items-center w-full px-2 rounded cursor-pointer text-neutral-400 text-sm justify-between'>
          <h1>Create an Event</h1>
          <svg className="icon_d90b3d" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M19 14a1 1 0 0 1 1 1v3h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3h-3a1 1 0 1 1 0-2h3v-3a1 1 0 0 1 1-1Z" fill="currentColor" className=""></path><path fillRule="evenodd" d="M22 13.67c0 .12-.33.17-.39.06A2.87 2.87 0 0 0 19 12a3 3 0 0 0-3 3v.5a.5.5 0 0 1-.5.5H15a3 3 0 0 0-3 3c0 1.2.7 2.1 1.73 2.61.11.06.06.39-.06.39H5a3 3 0 0 1-3-3v-9a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v3.67ZM5.5 12a.5.5 0 0 0-.5.5v3c0 .28.22.5.5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3Z" clipRule="evenodd" fill="currentColor" className=""></path><path d="M7 1a1 1 0 0 1 1 1v.75c0 .14.11.25.25.25h7.5c.14 0 .25-.11.25-.25V2a1 1 0 1 1 2 0v.75c0 .14.11.25.25.25H19a3 3 0 0 1 3 3 1 1 0 0 1-1 1H3a1 1 0 0 1-1-1 3 3 0 0 1 3-3h.75c.14 0 .25-.11.25-.25V2a1 1 0 0 1 1-1Z" fill="currentColor" className=""></path></svg>
        </div>}

        <div className='hover:bg-[#5865F2] p-1 hover:text-white transition-all flex items-center w-full px-2 rounded cursor-pointer text-neutral-400 text-sm justify-between'>
          <h1>Application Directory</h1>
          <svg className="icon_d90b3d" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M2.06 7.61c-.25.95.31 1.92 1.26 2.18l4.3 1.15c.94.25 1.91-.31 2.17-1.26l1.15-4.3c.25-.94-.31-1.91-1.26-2.17l-4.3-1.15c-.94-.25-1.91.31-2.17 1.26l-1.15 4.3ZM12.98 7.87a2 2 0 0 0 1.75 2.95H20a2 2 0 0 0 1.76-2.95l-2.63-4.83a2 2 0 0 0-3.51 0l-2.63 4.83ZM5.86 13.27a.89.89 0 0 1 1.28 0l.75.77a.9.9 0 0 0 .54.26l1.06.12c.5.06.85.52.8 1.02l-.13 1.08c-.02.2.03.42.14.6l.56.92c.27.43.14 1-.28 1.26l-.9.58a.92.92 0 0 0-.37.48l-.36 1.02a.9.9 0 0 1-1.15.57l-1-.36a.89.89 0 0 0-.6 0l-1 .36a.9.9 0 0 1-1.15-.57l-.36-1.02a.92.92 0 0 0-.37-.48l-.9-.58a.93.93 0 0 1-.28-1.26l.56-.93c.11-.17.16-.38.14-.59l-.12-1.08c-.06-.5.3-.96.8-1.02l1.05-.12a.9.9 0 0 0 .54-.26l.75-.77ZM18.52 13.71a1.1 1.1 0 0 0-2.04 0l-.46 1.24c-.19.5-.57.88-1.07 1.07l-1.24.46a1.1 1.1 0 0 0 0 2.04l1.24.46c.5.19.88.57 1.07 1.07l.46 1.24c.35.95 1.7.95 2.04 0l.46-1.24c.19-.5.57-.88 1.07-1.07l1.24-.46a1.1 1.1 0 0 0 0-2.04l-1.24-.46a1.8 1.8 0 0 1-1.07-1.07l-.46-1.24Z" className=""></path></svg>
        </div>

        <div className='w-full flex items-center bg-[#2E2F34] h-[1px]'></div>
        
        {!isAdmin && <div className='hover:bg-[#5865F2] p-1 hover:text-white transition-all flex items-center w-full px-2 rounded cursor-pointer text-neutral-400 text-sm justify-between'>
          <h1>Show All Channels</h1>
          <div className='size-[15px] rounded-sm border-2 border-neutral-400 group-hover:border-white'></div>
        </div>}

        <div className='hover:bg-[#5865F2] p-1 hover:text-white transition-all flex items-center w-full px-2 rounded cursor-pointer text-neutral-400 text-sm justify-between'>
          <h1>Notification Settings</h1>
          <svg className="icon_d90b3d" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M9.7 2.89c.18-.07.32-.24.37-.43a2 2 0 0 1 3.86 0c.05.2.19.36.38.43A7 7 0 0 1 19 9.5v2.09c0 .12.05.24.13.33l1.1 1.22a3 3 0 0 1 .77 2.01v.28c0 .67-.34 1.29-.95 1.56-1.31.6-4 1.51-8.05 1.51-4.05 0-6.74-.91-8.05-1.5-.61-.28-.95-.9-.95-1.57v-.28a3 3 0 0 1 .77-2l1.1-1.23a.5.5 0 0 0 .13-.33V9.5a7 7 0 0 1 4.7-6.61ZM9.18 19.84A.16.16 0 0 0 9 20a3 3 0 1 0 6 0c0-.1-.09-.17-.18-.16a24.86 24.86 0 0 1-5.64 0Z" className=""></path></svg>
        </div>

        <div className='hover:bg-[#5865F2] p-1 hover:text-white transition-all flex items-center w-full px-2 rounded cursor-pointer text-neutral-400 text-sm justify-between'>
          <h1>Privacy Settings</h1>
          <svg className="icon_d90b3d" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M4.27 5.22A2.66 2.66 0 0 0 3 7.5v2.3c0 5.6 3.3 10.68 8.42 12.95.37.17.79.17 1.16 0A14.18 14.18 0 0 0 21 9.78V7.5c0-.93-.48-1.78-1.27-2.27l-6.17-3.76a3 3 0 0 0-3.12 0L4.27 5.22ZM6 7.68l6-3.66V12H6.22C6.08 11.28 6 10.54 6 9.78v-2.1Zm6 12.01V12h5.78A11.19 11.19 0 0 1 12 19.7Z" clipRule="evenodd" className=""></path></svg>
        </div>

        <div className='w-full flex items-center bg-[#2E2F34] h-[1px]'></div>

        <div className='hover:bg-[#5865F2] p-1 hover:text-white transition-all flex items-center w-full px-2 rounded cursor-pointer text-neutral-400 text-sm justify-between'>
          <h1>Edit Server Profile</h1>
          <svg className="icon_d90b3d" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z" className=""></path></svg>
        </div>

        <div className='hover:bg-[#5865F2] p-1 hover:text-white group transition-all flex items-center w-full px-2 rounded cursor-pointer text-neutral-400 text-sm justify-between'>
          <h1>Hide Muted Channels</h1>
          <div className='size-[15px] rounded-sm border-2 border-neutral-400 group-hover:border-white'></div>
        </div>

        {!isAdmin && <div className='hover:bg-[#DA373C] p-1 hover:text-white group transition-all flex items-center w-full px-2 rounded cursor-pointer text-[#DA373C] text-sm justify-between'>
          <h1>Leave Server</h1>
          <svg className="icon_d90b3d" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M9 12a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Z" className=""></path><path fill="currentColor" fillRule="evenodd" d="M2.75 3.02A3 3 0 0 1 5 2h10a3 3 0 0 1 3 3v7.64c0 .44-.55.7-.95.55a3 3 0 0 0-3.17 4.93l.02.03a.5.5 0 0 1-.35.85h-.05a.5.5 0 0 0-.5.5 2.5 2.5 0 0 1-3.68 2.2l-5.8-3.09A3 3 0 0 1 2 16V5a3 3 0 0 1 .76-1.98Zm1.3 1.95A.04.04 0 0 0 4 5v11c0 .36.2.68.49.86l5.77 3.08a.5.5 0 0 0 .74-.44V8.02a.5.5 0 0 0-.32-.46l-6.63-2.6Z" clipRule="evenodd" className=""></path><path fill="currentColor" d="M15.3 16.7a1 1 0 0 1 1.4-1.4l4.3 4.29V16a1 1 0 1 1 2 0v6a1 1 0 0 1-1 1h-6a1 1 0 1 1 0-2h3.59l-4.3-4.3Z" className=""></path></svg>
        </div>}

      </div>
    </div>
  )
}

export default ServerModal