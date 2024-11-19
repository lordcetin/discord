/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useCreateChannel } from '@/store/createChannel'
import { IoMdRadioButtonOff } from "react-icons/io";
import { IoRadioButtonOn } from "react-icons/io5";
import PillToggle from '../PillToggle/PillToggle';
import axios from 'axios';
import { useParams } from 'next/navigation';
type Props = {}

const CreateChannelModal = (props: Props) => {
  const {toggleCreateChannelModal }:any = useCreateChannel()
  const params:any = useParams()
  const serverId = params?.username[0]
  const [isText,setText] = useState(true);
  const [isAudio,setAudio] = useState(false);
  const [checked,setIsChecked] = useState('off')
  const [channelName,setChannelName] = useState('')
  const [loading,setLoading] = useState(false);


  const handleSubmit = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append("channelName",channelName)
    formData.append("serverId",serverId)
    formData.append("channelType",isText ? 'TEXT' : 'AUDIO')
    formData.append("privateChannel",checked == 'on' ? 'on' : 'off')
    const {status} = await axios.post(`/api/channel`,formData)
    if(status == 200){
      setLoading(false)
      toggleCreateChannelModal()
    }
  }

  return (
    <>
    <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-[9999] flex justify-center items-center'>
     <div className='flex-col items-center w-[460px] rounded-sm bg-[#313338] relative'>
      <div className='flex-col items-center px-5'>
        <div className='flex items-center py-[16px] justify-between w-full'>
        <h1 className='text-lg text-neutral-300'>Create Channel</h1>
        <AiOutlineClose size={20} onClick={toggleCreateChannelModal} className=' text-neutral-400 hover:text-neutral-500 cursor-pointer'/>
        </div>
        <p className='mt-3 font-semibold text-sm text-neutral-400'>Channel Type</p>
        <div onClick={() => {setText(true),setAudio(false)}} className={isText ? 'bg-[#43444B] flex items-center p-4 gap-x-2 text-[#BFC1C5] rounded-sm my-2 cursor-pointer' : 'bg-[#393C41] hover:bg-[#43444B] transition-all cursor-pointer flex items-center p-4 gap-x-2 text-[#BFC1C5] rounded-sm my-2'}>
          <div className='flex items-center relative'>     
            {checked == 'on' ? <svg className="icon_b545d5" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M16 4h.5v-.5a2.5 2.5 0 0 1 5 0V4h.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm4-.5V4h-2v-.5a1 1 0 1 1 2 0Z" clipRule="evenodd" className="foreground_b545d5"></path><path fill="currentColor" d="M12.5 8c.28 0 .5.22.5.5V9c0 .1 0 .2.02.31.03.34-.21.69-.56.69H9.85l-.67 4h4.97l.28-1.68c.06-.34.44-.52.77-.43a3 3 0 0 0 .8.11c.27 0 .47.24.43.5l-.25 1.5H20a1 1 0 1 1 0 2h-4.15l-.86 5.16a1 1 0 0 1-1.98-.32l.8-4.84H8.86l-.86 5.16A1 1 0 0 1 6 20.84L6.82 16H3a1 1 0 1 1 0-2h4.15l.67-4H4a1 1 0 1 1 0-2h4.15l.86-5.16a1 1 0 1 1 1.98.32L10.19 8h2.31Z" className="foreground_b545d5"></path></svg> : <svg className="icon_b545d5" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z" clipRule="evenodd" className="foreground_b545d5"></path></svg>}
          </div>
          <div className='flex-col items-center w-full'>
            <h1>Text</h1>
            <p className='whitespace-pre-wrap text-sm'>Send messages, pictures, GIFs, emojis, ideas and jokes</p>
          </div>
          {isText ? <IoRadioButtonOn className='size-[20px] whitespace-nowrap shrink-0 text-white'/> : <IoMdRadioButtonOff className='size-[20px] whitespace-nowrap shrink-0 text-white'/>}
        </div>
        <div onClick={() => {setAudio(true),setText(false)}} className={isAudio ? 'bg-[#43444B] flex items-center p-4 gap-x-2 text-[#BFC1C5] rounded-sm my-2 cursor-pointer' : 'bg-[#393C41] hover:bg-[#43444B] transition-all cursor-pointer flex items-center p-4 gap-x-2 text-[#BFC1C5] rounded-sm my-2'}>
          <div className='flex items-center relative'>
            {checked == 'on' ? <svg className="icon_b545d5" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M16 4h.5v-.5a2.5 2.5 0 0 1 5 0V4h.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm4-.5V4h-2v-.5a1 1 0 1 1 2 0Z" clipRule="evenodd" className="foreground_b545d5"></path><path fill="currentColor" d="M11 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1h-.06a1 1 0 0 1-.74-.32L5.92 17H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2.92l4.28-4.68a1 1 0 0 1 .74-.32H11ZM20.5 12c-.28 0-.5.22-.52.5a7 7 0 0 1-5.13 6.25c-.48.13-.85.55-.85 1.05v.03c0 .6.52 1.06 1.1.92a9 9 0 0 0 6.89-8.25.48.48 0 0 0-.49-.5h-1ZM16.5 12c-.28 0-.5.23-.54.5a3 3 0 0 1-1.33 2.02c-.35.23-.63.6-.63 1.02v.14c0 .63.59 1.1 1.16.83a5 5 0 0 0 2.82-4.01c.02-.28-.2-.5-.48-.5h-1Z" className="foreground_b545d5"></path></svg> : <svg className="icon_b545d5" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z" className="foreground_b545d5"></path><path fill="currentColor" d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z" className="foreground_b545d5"></path></svg>}
          </div>
          <div className='flex-col items-center w-full'>
            <h1>Audio</h1>
            <p className='whitespace-pre-wrap text-sm'>Talk together with voice, video or share screens</p>
          </div>
          {isAudio ? <IoRadioButtonOn className='size-[20px] whitespace-nowrap shrink-0 text-white'/> : <IoMdRadioButtonOff className='size-[20px] whitespace-nowrap shrink-0 text-white'/>}
        </div>
        <h1 className='mt-5 flex items-center w-full text-neutral-300 text-xs uppercase font-semibold'>Channel Name</h1>
        <div className='bg-[#1E1F22] w-full flex items-center rounded-sm px-2 mt-2 text-neutral-400'>
          {isText ? 
          <>
          {checked == 'on' ? <svg className="inputPrefix_b545d5" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M16 4h.5v-.5a2.5 2.5 0 0 1 5 0V4h.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm4-.5V4h-2v-.5a1 1 0 1 1 2 0Z" clipRule="evenodd" className=""></path><path fill="currentColor" d="M12.5 8c.28 0 .5.22.5.5V9c0 .1 0 .2.02.31.03.34-.21.69-.56.69H9.85l-.67 4h4.97l.28-1.68c.06-.34.44-.52.77-.43a3 3 0 0 0 .8.11c.27 0 .47.24.43.5l-.25 1.5H20a1 1 0 1 1 0 2h-4.15l-.86 5.16a1 1 0 0 1-1.98-.32l.8-4.84H8.86l-.86 5.16A1 1 0 0 1 6 20.84L6.82 16H3a1 1 0 1 1 0-2h4.15l.67-4H4a1 1 0 1 1 0-2h4.15l.86-5.16a1 1 0 1 1 1.98.32L10.19 8h2.31Z" className=""></path></svg> : <svg className="inputPrefix_b545d5" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z" clipRule="evenodd" className=""></path></svg>}
          </>
          : 
          <>
          {checked == 'on' ? <svg className="inputPrefix_b545d5" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M16 4h.5v-.5a2.5 2.5 0 0 1 5 0V4h.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm4-.5V4h-2v-.5a1 1 0 1 1 2 0Z" clipRule="evenodd" className=""></path><path fill="currentColor" d="M11 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1h-.06a1 1 0 0 1-.74-.32L5.92 17H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2.92l4.28-4.68a1 1 0 0 1 .74-.32H11ZM20.5 12c-.28 0-.5.22-.52.5a7 7 0 0 1-5.13 6.25c-.48.13-.85.55-.85 1.05v.03c0 .6.52 1.06 1.1.92a9 9 0 0 0 6.89-8.25.48.48 0 0 0-.49-.5h-1ZM16.5 12c-.28 0-.5.23-.54.5a3 3 0 0 1-1.33 2.02c-.35.23-.63.6-.63 1.02v.14c0 .63.59 1.1 1.16.83a5 5 0 0 0 2.82-4.01c.02-.28-.2-.5-.48-.5h-1Z" className=""></path></svg> :  <svg className="inputPrefix_b545d5" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z" className=""></path><path fill="currentColor" d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z" className=""></path></svg>}
          </>
          }
          <input type='text' name='create_channel' onChange={(e:any) => setChannelName(e.target.value)} className='bg-transparent py-2 w-full px-2 placeholder:text-neutral-400 outline-none' placeholder='new-channel'></input>
        </div>
        <div className='flex justify-between items-center w-full mt-5 text-[#A5A6A9] pr-1'>
          <div className='flex-col justify-between items-center gap-x-1 relative w-full'>
            <div className='flex items-center gap-x-1'>
            <svg className="switchIcon_b545d5" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M6 9h1V6a5 5 0 0 1 10 0v3h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3Zm9-3v3H9V6a3 3 0 1 1 6 0Zm-1 8a2 2 0 0 1-1 1.73V18a1 1 0 1 1-2 0v-2.27A2 2 0 1 1 14 14Z" clipRule="evenodd" className=""></path></svg>
            <div className='flex justify-between items-center w-full'>
              <h1>Private Channel</h1>
              <PillToggle setIsChecked={setIsChecked}/>
            </div>
            </div>
            <p className='text-sm whitespace-nowrap mt-2'>Only selected members and roles can view this channel.</p>
          </div>
        </div>
      </div>
        <div className='bg-[#2B2D31] h-[70px] w-full p-[16px] mt-5 rounded-b-sm'>
          <div className='flex justify-end items-center w-full'>
            <h1 onClick={toggleCreateChannelModal} className='cursor-pointer py-[2px] px-[16px] text-[#C5C8CC] w-[96px] h-[38px] flex justify-center items-center text-sm'>Cancel</h1>
            <button type='button' onClick={() => handleSubmit()} disabled={channelName == ''} className='disabled:bg-[#414991] disabled:text-neutral-400 text-white h-[38px] text-sm flex justify-center items-center bg-[#5865F2] hover:bg-[#4752C4] transition-all py-[2px] px-[16px] rounded-sm whitespace-nowrap'>Create Channel</button>
          </div>
        </div>
     </div>
    </div>
    </>
  )
}

export default CreateChannelModal