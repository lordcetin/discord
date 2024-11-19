/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState } from 'react'
import { FaGift } from "react-icons/fa6";
import { AiOutlineGif } from "react-icons/ai";
import { FaSmile } from "react-icons/fa";
import qs from 'query-string'
import axios from 'axios';
import Image from 'next/image';
import EmojiPicker from '../EmojiPicker/EmojiPicker';
import { LuFile } from 'react-icons/lu';

type Props = {
  apiUrl: string;
  query: Record<string,any>;
  name: string;
  type: "conversation" | "channel";
}

const Input = ({apiUrl,query,name,type}: Props) => {
  const [inputVal,setInput] = useState("")
  const [openModal,setOpenModal] = useState(false);
  const [fileUrl,setFileUrl] = useState<any>("")
  const [selectedImage,setSelectedImage] = useState<any>("")
  const fileType = selectedImage?.split(".").pop();
  const isPDF = fileType === "pdf" && selectedImage;
  const isImage = !isPDF && selectedImage;
  const onSubmit = async () => {
    try {
      if(fileUrl){

      
      const formData = new FormData()
      formData.append('image',fileUrl)
      const {data} = await axios.post('/api/upload',formData)

      const url = qs.stringifyUrl({
        url:apiUrl,
        query,
      })
      await axios.post(url,{content:inputVal,fileUrl:selectedImage ? data?.fileUrl : null})
      setSelectedImage("")
      setFileUrl("")
      }else{
        const url = qs.stringifyUrl({
          url:apiUrl,
          query,
        })
        await axios.post(url,{content:inputVal,fileUrl: null})
      }
    } catch (error) {
      console.log("error",error)
    }
  }

  return (
    <div className='absolute bottom-0 left-0 w-full'>
      <div className='bg-[#313338] w-full flex-col flex justify-center items-center px-5 pb-9'>
      {openModal && 
      <div className='w-[200px] p-2 rounded-sm bg-neutral-950 absolute bottom-12 left-5'>
        <label>
          <div className='flex items-center gap-x-2 p-2 hover:bg-neutral-800 transition-all rounded cursor-pointer'>
            <svg className="optionIcon_ec5137" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M13.82 21.7c.17.05.14.3-.04.3H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h7.5c.28 0 .5.22.5.5V5a5 5 0 0 0 5 5h2.5c.28 0 .5.22.5.5v2.3a.4.4 0 0 1-.68.27l-.2-.2a3 3 0 0 0-4.24 0l-4 4a3 3 0 0 0 0 4.25c.3.3.6.46.94.58Z" className=""></path><path fill="currentColor" d="M21.66 8c.03 0 .05-.03.04-.06a3 3 0 0 0-.58-.82l-4.24-4.24a3 3 0 0 0-.82-.58.04.04 0 0 0-.06.04V5a3 3 0 0 0 3 3h2.66ZM18.3 14.3a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L20 17.42V23a1 1 0 1 1-2 0v-5.59l-2.3 2.3a1 1 0 0 1-1.4-1.42l4-4Z" className=""></path></svg>
            <h1>Upload a file</h1>
          </div>
          <input
            className="hidden absolute h-52 -left-96"
            type="file"
            name="Asset"
            accept="image/*, audio/*, video/*, .pdf, .doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={({target}) => {
              if(target.files){
                const file = target.files[0];
                setSelectedImage(URL.createObjectURL(file));
                setFileUrl(file)
                setOpenModal(false)
              }
            }}
          />
          </label>
      </div>
      }
      <div className='bg-[#383A40] flex-col items-center w-full rounded-lg px-3'>
      {isImage &&
      <div className='flex-col items-center w-full rounded-t-lg bg-[#383A40] px-[10px] pt-[20px] pb-[10px]'>
        <div className='bg-[#2B2D31] p-2 rounded-md overflow-hidden whitespace-nowrap w-[216px] relative'>
          <div className='bg-[#313338] flex items-center gap-x-2 absolute top-0 right-0 rounded-sm hover:shadow-md hover:shadow-black/50 transition-all p-2'>
            <svg className="actionBarIcon_b1fc5c cursor-pointer hover:text-white transition-all text-neutral-400" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M15.56 11.77c.2-.1.44.02.44.23a4 4 0 1 1-4-4c.21 0 .33.25.23.44a2.5 2.5 0 0 0 3.32 3.32Z" className=""></path><path fill="currentColor" fillRule="evenodd" d="M22.89 11.7c.07.2.07.4 0 .6C22.27 13.9 19.1 21 12 21c-7.11 0-10.27-7.11-10.89-8.7a.83.83 0 0 1 0-.6C1.73 10.1 4.9 3 12 3c7.11 0 10.27 7.11 10.89 8.7Zm-4.5-3.62A15.11 15.11 0 0 1 20.85 12c-.38.88-1.18 2.47-2.46 3.92C16.87 17.62 14.8 19 12 19c-2.8 0-4.87-1.38-6.39-3.08A15.11 15.11 0 0 1 3.15 12c.38-.88 1.18-2.47 2.46-3.92C7.13 6.38 9.2 5 12 5c2.8 0 4.87 1.38 6.39 3.08Z" clipRule="evenodd" className=""></path></svg>
            <svg className="actionBarIcon_b1fc5c cursor-pointer hover:text-white transition-all text-neutral-400" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z" className=""></path></svg>
            <svg onClick={() => {setFileUrl(""),setSelectedImage("")}} className="actionBarIcon_b1fc5c cursor-pointer hover:text-white transition-all text-red-600" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z" className=""></path><path fill="currentColor" fillRule="evenodd" d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z" clipRule="evenodd" className=""></path></svg>
          </div>
          <Image src={selectedImage} alt='' width={800} height={800} className='w-full h-[216px] rounded-md object-cover bg-[#414246]'/>
        </div>
        <div className='w-full h-[1px] bg-neutral-500 mt-2'></div>
      </div>
      }
      {isPDF &&
      <div className='flex-col items-center w-full rounded-t-lg bg-[#383A40] px-[10px] pt-[20px] pb-[10px]'>
        <div className='bg-[#2B2D31] p-2 rounded-md overflow-hidden whitespace-nowrap w-[216px] relative'>
          <div className='bg-[#313338] flex items-center gap-x-2 absolute top-0 right-0 rounded-sm hover:shadow-md hover:shadow-black/50 transition-all p-2'>
            <svg className="actionBarIcon_b1fc5c cursor-pointer hover:text-white transition-all text-neutral-400" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M15.56 11.77c.2-.1.44.02.44.23a4 4 0 1 1-4-4c.21 0 .33.25.23.44a2.5 2.5 0 0 0 3.32 3.32Z" className=""></path><path fill="currentColor" fillRule="evenodd" d="M22.89 11.7c.07.2.07.4 0 .6C22.27 13.9 19.1 21 12 21c-7.11 0-10.27-7.11-10.89-8.7a.83.83 0 0 1 0-.6C1.73 10.1 4.9 3 12 3c7.11 0 10.27 7.11 10.89 8.7Zm-4.5-3.62A15.11 15.11 0 0 1 20.85 12c-.38.88-1.18 2.47-2.46 3.92C16.87 17.62 14.8 19 12 19c-2.8 0-4.87-1.38-6.39-3.08A15.11 15.11 0 0 1 3.15 12c.38-.88 1.18-2.47 2.46-3.92C7.13 6.38 9.2 5 12 5c2.8 0 4.87 1.38 6.39 3.08Z" clipRule="evenodd" className=""></path></svg>
            <svg className="actionBarIcon_b1fc5c cursor-pointer hover:text-white transition-all text-neutral-400" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z" className=""></path></svg>
            <svg onClick={() => {setFileUrl(""),setSelectedImage("")}} className="actionBarIcon_b1fc5c cursor-pointer hover:text-white transition-all text-red-600" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z" className=""></path><path fill="currentColor" fillRule="evenodd" d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z" clipRule="evenodd" className=""></path></svg>
          </div>
          <div className='w-full h-[216px] rounded-md object-cover bg-[#414246]'>
            <LuFile/>
            {fileUrl}
          </div>
        </div>
        <div className='w-full h-[1px] bg-neutral-500 mt-2'></div>
      </div>
      }
      <div className='bg-[#383A40] flex items-center w-full rounded-lg px-3 space-x-4'>
      <svg onClick={() => setOpenModal(!openModal)} className='cursor-pointer' role="img" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="transparent" className=""></circle><path fill="#DBDEE1" fillRule="evenodd" d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm0-17a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H7a1 1 0 1 1 0-2h4V7a1 1 0 0 1 1-1Z" clipRule="evenodd" className="attachButtonPlus_f298d4"></path></svg>
      
      <input
      type='text'     
      onKeyDown={(e:any) => {
          if (e.key === 'Enter') {
            onSubmit()
            setInput("")
          }
      }} 
      placeholder={name}
      value={inputVal}
      onChange={(e:any) => setInput(e.target.value)}
      className='w-full h-[44px] rounded-lg bg-transparent outline-none py-[9px] min-h-[44px] max-h-[150px]'/>

      <FaGift size={35} className='text-[#B5BAC1] cursor-pointer hover:text-white transition-all'/>
      <div className='bg-[#B5BAC1] hover:text-white transition-all rounded px-1 size-[24px] flex justify-center items-center cursor-pointer'><AiOutlineGif className='text-neutral-800'/></div>
      <svg className=' cursor-pointer fill-[#B5BAC1] hover:fill-[#B5BAC1] transition-all' height="45" viewBox="0 0 24 24" width="45" xmlns="http://www.w3.org/2000/svg"><path d="M17.75 3C19.5449 3 21 4.45507 21 6.25V12.999L16.2512 13L16.038 13.0069C14.8404 13.0848 13.8195 13.8111 13.3236 14.8393C12.9039 14.9527 12.4636 15.0095 12.0009 15.0095C10.9561 15.0095 10.0214 14.7199 9.17654 14.1356C8.83587 13.9 8.36869 13.9851 8.13307 14.3258C7.89744 14.6665 7.98259 15.1336 8.32326 15.3693C9.41979 16.1277 10.6524 16.5095 12.0009 16.5095C12.2279 16.5095 12.4518 16.4987 12.6724 16.477L13.0009 16.4364L13 21H6.25C4.45507 21 3 19.5449 3 17.75V6.25C3 4.45507 4.45507 3 6.25 3H17.75ZM20.341 14.7197L14.7197 20.341C14.6508 20.4098 14.578 20.4737 14.5017 20.5325L14.5008 16.2501L14.5066 16.1066C14.5759 15.2573 15.2516 14.5794 16.0999 14.5065L16.2514 14.5L20.5332 14.5007C20.4743 14.5774 20.4101 14.6505 20.341 14.7197ZM9.00045 7.75116C8.31048 7.75116 7.75116 8.31048 7.75116 9.00045C7.75116 9.69041 8.31048 10.2497 9.00045 10.2497C9.69041 10.2497 10.2497 9.69041 10.2497 9.00045C10.2497 8.31048 9.69041 7.75116 9.00045 7.75116ZM15.0004 7.75116C14.3105 7.75116 13.7512 8.31048 13.7512 9.00045C13.7512 9.69041 14.3105 10.2497 15.0004 10.2497C15.6904 10.2497 16.2497 9.69041 16.2497 9.00045C16.2497 8.31048 15.6904 7.75116 15.0004 7.75116Z"/></svg>
      <EmojiPicker onChange={(emoji:any) => setInput(`${inputVal == '' ? emoji : inputVal+" "+emoji}`)}/>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Input